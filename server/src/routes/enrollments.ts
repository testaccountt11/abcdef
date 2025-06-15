import express from "express";
import { Pool } from "pg";
import { z } from "zod";
import { authenticateToken } from "../middleware/auth.js";
import { User } from "../types/index.js";

const router = express.Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.connect()
  .then(() => {
    console.log('Connected to database');
    // Check if tables exist
    return pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'enrollments'
      );
    `);
  })
  .then(result => {
    if (!result.rows[0].exists) {
      console.log('Creating enrollments table...');
      return pool.query(`
        CREATE TABLE enrollments (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          course_id TEXT NOT NULL,
          progress INTEGER DEFAULT 0,
          completed BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  })
  .catch(err => {
    console.error('Database initialization error:', err);
    process.exit(1);
  });

// Schema for enrollment
const enrollmentSchema = z.object({
  courseId: z.number(),
  progress: z.number().optional(),
  completed: z.boolean().optional()
});

// Get user's enrollments
router.get("/", authenticateToken, async (req: express.Request & { user?: User }, res) => {
  try {
    console.log('Fetching enrollments for user:', req.user?.id);
    
    if (!req.user?.id) {
      console.error('No user ID in request');
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await pool.query(
      `SELECT e.*, c.* 
       FROM enrollments e 
       LEFT JOIN courses c ON e.course_id = c.id 
       WHERE e.user_id = $1`,
      [req.user.id]
    );

    console.log('Found enrollments:', result.rows);

    // Transform the response to match the expected format
    const enrollments = result.rows.map(row => ({
      id: row.id,
      course_id: row.course_id,
      user_id: row.user_id,
      progress: row.progress,
      completed: row.completed,
      course: row.id ? {
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category,
        provider: row.provider
      } : null
    }));

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Enroll in a course
router.post("/", authenticateToken, async (req: express.Request & { user?: User }, res) => {
  try {
    console.log('Enrolling user:', req.user?.id, 'in course:', req.body);
    
    if (!req.user?.id) {
      console.error('No user ID in request');
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { courseId } = enrollmentSchema.parse(req.body);

    // Check if course exists
    const courseCheck = await pool.query(
      "SELECT id FROM courses WHERE id = $1",
      [courseId]
    );

    if (courseCheck.rows.length === 0) {
      console.error('Course not found:', courseId);
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await pool.query(
      "SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2",
      [req.user.id, courseId]
    );

    if (existingEnrollment.rows.length > 0) {
      console.log('User already enrolled in course:', courseId);
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Create new enrollment
    const result = await pool.query(
      `INSERT INTO enrollments (user_id, course_id, progress, completed) 
       VALUES ($1, $2, 0, false) 
       RETURNING *`,
      [req.user.id, courseId]
    );

    console.log('Created enrollment:', result.rows[0]);

    // Get the course details
    const courseResult = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [courseId]
    );

    const enrollment = result.rows[0];
    const course = courseResult.rows[0];

    // Return enrollment with course details
    res.status(201).json({
      ...enrollment,
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        imageUrl: course.image_url,
        category: course.category,
        provider: course.provider
      }
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ 
      error: "Internal server error",
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update enrollment progress
router.patch("/:id", authenticateToken, async (req: express.Request & { user?: User }, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const { progress, completed } = enrollmentSchema.partial().parse(req.body);

    // Check if enrollment exists and belongs to user
    const enrollment = await pool.query(
      "SELECT * FROM enrollments WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (enrollment.rows.length === 0) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    // Update enrollment
    const result = await pool.query(
      "UPDATE enrollments SET progress = COALESCE($1, progress), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *",
      [progress, completed, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error updating enrollment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router; 