import { Router } from 'express';
import { db } from '../db';
import { and, eq } from 'drizzle-orm';
import { users, skills, education, languages, projects, achievements, userStats } from '@/shared/schema';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, parseInt(req.params.userId)),
      columns: {
        password: false,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user stats
router.get('/:userId/stats', isAuthenticated, async (req, res) => {
  try {
    const stats = await db.query.userStats.findFirst({
      where: eq(userStats.userId, parseInt(req.params.userId)),
    });

    if (!stats) {
      return res.json({
        coursesInProgress: 0,
        certificatesEarned: 0,
        mentorSessions: 0,
        opportunitiesSaved: 0,
      });
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user achievements
router.get('/:userId/achievements', isAuthenticated, async (req, res) => {
  try {
    const userAchievements = await db.query.achievements.findMany({
      where: eq(achievements.userId, parseInt(req.params.userId)),
      orderBy: (achievements, { desc }) => [desc(achievements.unlockedAt)],
    });

    res.json(userAchievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user skills
router.get('/:userId/skills', async (req, res) => {
  try {
    const userSkills = await db.query.skills.findMany({
      where: eq(skills.userId, parseInt(req.params.userId)),
      orderBy: (skills, { desc }) => [desc(skills.proficiency)],
    });

    res.json(userSkills);
  } catch (error) {
    console.error('Error fetching user skills:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user education
router.get('/:userId/education', async (req, res) => {
  try {
    const userEducation = await db.query.education.findMany({
      where: eq(education.userId, parseInt(req.params.userId)),
      orderBy: (education, { desc }) => [desc(education.endDate)],
    });

    res.json(userEducation);
  } catch (error) {
    console.error('Error fetching user education:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user languages
router.get('/:userId/languages', async (req, res) => {
  try {
    const userLanguages = await db.query.languages.findMany({
      where: eq(languages.userId, parseInt(req.params.userId)),
      orderBy: (languages, { desc }) => [desc(languages.proficiency)],
    });

    res.json(userLanguages);
  } catch (error) {
    console.error('Error fetching user languages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user projects
router.get('/:userId/projects', async (req, res) => {
  try {
    const userProjects = await db.query.projects.findMany({
      where: eq(projects.userId, parseInt(req.params.userId)),
      orderBy: (projects, { desc }) => [desc(projects.endDate)],
    });

    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 