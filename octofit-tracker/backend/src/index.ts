import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// MongoDB connection
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('✓ Connected to MongoDB at', mongoUrl);
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
  });

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 OctoFit Tracker API running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
