import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid analysis ID' });
  }

  try {
    const analysisPath = path.join(process.cwd(), 'data', 'analyses', `${id}.json`);
    const analysisData = await fs.readFile(analysisPath, 'utf-8');
    res.status(200).json(JSON.parse(analysisData));
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(404).json({ error: 'Analysis not found' });
  }
} 