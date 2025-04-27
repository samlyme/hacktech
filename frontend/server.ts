import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3001;

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Function to process CSV data
const processCSVData = (csvText: string) => {
  try {
    console.log('Processing CSV data...');
    console.log('First few lines of CSV:', csvText.split('\n').slice(0, 5));
    
    // Check if the CSV has content
    if (!csvText.trim()) {
      throw new Error('CSV file is empty');
    }

    // Split into lines and remove empty lines
    const lines = csvText.split('\n').filter(line => line.trim());
    console.log('Number of non-empty lines:', lines.length);
    
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header and one data row');
    }

    // Get header row
    const header = lines[0].split(',');
    console.log('CSV headers:', header);
    
    // Process data rows
    const rows = lines.slice(1);
    console.log('Number of data rows:', rows.length);
    
    const totalSeconds = rows.length;
    const totalHours = totalSeconds / 3600;
    
    // Process events
    const events = {
      snoring: 0,
      breath: 0
    };
    
    let validRows = 0;
    let invalidRows = 0;
    
    rows.forEach((row, index) => {
      try {
        const columns = row.split(',');
        // Skip rows with incorrect number of columns
        if (columns.length < 4) {
          console.log(`Row ${index} has insufficient columns:`, columns);
          invalidRows++;
          return;
        }
        
        // We only need:
        // - Mic (column 1) for noise level
        // - nasal (column 2) for snoring events
        // - resp (column 3) for breath events
        const mic = parseFloat(columns[1]);
        const nasal = parseFloat(columns[2]);
        const resp = parseFloat(columns[3]);
        
        if (isNaN(mic) || isNaN(nasal) || isNaN(resp)) {
          console.log(`Row ${index} has invalid numbers:`, { mic, nasal, resp });
          invalidRows++;
          return;
        }
        
        validRows++;
        if (Math.abs(nasal - 1.0) < 0.0001) events.snoring++;
        if (Math.abs(resp - 1.0) < 0.0001) events.breath++;
      } catch (rowError) {
        console.error(`Error processing row ${index}:`, rowError);
        invalidRows++;
      }
    });
    
    console.log('Processing results:', {
      validRows,
      invalidRows,
      events,
      totalSeconds,
      totalHours
    });
    
    if (validRows === 0) {
      throw new Error('No valid rows found in CSV file');
    }
    
    const totalEvents = events.snoring + events.breath;
    const eventsPerHour = totalEvents / totalHours;
    
    // Calculate AHI severity
    let severity = "Normal";
    if (eventsPerHour >= 30) severity = "Severe";
    else if (eventsPerHour >= 15) severity = "Moderate";
    else if (eventsPerHour >= 5) severity = "Mild";
    
    return {
      duration: totalHours,
      totalEvents,
      eventsPerHour,
      severity,
      events
    };
  } catch (error) {
    console.error('Error processing CSV:', error);
    throw error;
  }
};

// Create uploads directory if it doesn't exist
fs.mkdir('uploads', { recursive: true }).catch(console.error);

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Handle file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  console.log('Received upload request');
  try {
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', req.file);

    // Read the CSV file
    const csvText = await fs.readFile(req.file.path, 'utf-8');
    console.log('File read successfully, length:', csvText.length);
    
    // Process the data
    const analysisData = processCSVData(csvText);
    
    // Generate a unique ID for this analysis
    const id = uuidv4();
    
    // Create directories if they don't exist
    await fs.mkdir(path.join(process.cwd(), 'data', 'analyses'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'recordings'), { recursive: true });
    
    // Save the analysis data
    const analysisPath = path.join(process.cwd(), 'data', 'analyses', `${id}.json`);
    await fs.writeFile(analysisPath, JSON.stringify(analysisData));
    
    // Save the CSV file
    const csvPath = path.join(process.cwd(), 'data', 'recordings', `${id}.csv`);
    await fs.writeFile(csvPath, csvText);
    
    // Clean up the temporary upload file
    await fs.unlink(req.file.path);
    
    console.log('Upload processed successfully');
    res.status(200).json({ id, ...analysisData });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('CORS enabled for http://localhost:5173');
}); 