import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import { IncomingMessage } from 'http';

// Function to process CSV data
const processCSVData = (csvText: string) => {
  console.log('Processing CSV data...');
  console.log('First few lines of CSV:', csvText.split('\n').slice(0, 5));
  
  const rows = csvText.split('\n').slice(1); // Skip header row
  console.log('Number of rows:', rows.length);
  
  const totalSeconds = rows.length - 1; // -1 for header
  const totalHours = totalSeconds / 3600;
  
  // Process events
  const events = {
    snoring: 0,
    breath: 0
  };
  
  let validRows = 0;
  let invalidRows = 0;
  
  rows.forEach((row, index) => {
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
  });
  
  console.log('Processing results:', {
    validRows,
    invalidRows,
    events,
    totalSeconds,
    totalHours
  });
  
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
};

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data
    const form = formidable({});
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req as IncomingMessage, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file;
    if (!file || Array.isArray(file)) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the CSV file
    const csvText = await fs.readFile((file as formidable.File).filepath, 'utf-8');
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
    
    res.status(200).json({ id, ...analysisData });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
} 