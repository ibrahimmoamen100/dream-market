
import express from 'express';
import uploadRouter from './upload';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3001;

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Ensure store.json exists
const storeDir = path.join(process.cwd(), 'src', 'data');
const storePath = path.join(storeDir, 'store.json');
if (!fs.existsSync(storeDir)) {
  fs.mkdirSync(storeDir, { recursive: true });
}
if (!fs.existsSync(storePath)) {
  fs.writeFileSync(storePath, JSON.stringify({ products: [] }, null, 2));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files
app.use('/upload', express.static(uploadDir));

// Routes
app.use('/api', uploadRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
