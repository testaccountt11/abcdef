import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// User endpoints
router.get('/api/user', (req, res) => {
  res.status(200).json({ user: { id: 1, name: 'Test User' } });
});

// Course endpoints
router.get('/api/courses', (req, res) => {
  res.status(200).json({ courses: [] });
});

router.get('/api/courses/:id', (req, res) => {
  res.status(200).json({ course: { id: req.params.id, title: 'Test Course' } });
});

// Opportunity endpoints
router.get('/api/opportunities', (req, res) => {
  res.status(200).json({ opportunities: [] });
});

router.get('/api/opportunities/:id', (req, res) => {
  res.status(200).json({ opportunity: { id: req.params.id, title: 'Test Opportunity' } });
});

// Mentor endpoints
router.get('/api/mentors', (req, res) => {
  res.status(200).json({ mentors: [] });
});

router.get('/api/mentors/:id', (req, res) => {
  res.status(200).json({ mentor: { id: req.params.id, name: 'Test Mentor' } });
});

// Advice endpoints
router.get('/api/advice', (req, res) => {
  res.status(200).json({ advice: [] });
});

// Certificate endpoints
router.get('/api/certificates', (req, res) => {
  res.status(200).json({ certificates: [] });
});

// Achievement endpoints
router.get('/api/achievements', (req, res) => {
  res.status(200).json({ achievements: [] });
});

// Catch-all route for 404
router.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export { router }; 