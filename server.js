import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  
  // Create a simple index.html if it doesn't exist
  const indexPath = path.join(publicDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfol.io</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Portfol.io</h1>
          <p>Application is online and working!</p>
        </body>
      </html>
    `);
  }
}

// API middleware
app.use(express.json());

// Serve static files
app.use(express.static(publicDir));

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API is working' });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
