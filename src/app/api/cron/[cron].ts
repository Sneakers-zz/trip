
import type { VercelRequest, VercelResponse } from '@vercel/node';
 const tasks: Record<string, () => void>   = {
  '1m': () => {
    console.log('Running task every minute');
    // Add your task logic here
  },
  '10m': () => {
    console.log('Running task every 10 minutes');
    // Add your task logic here
  },
  '1h': () => {
    console.log('Running task every hour');
    // Add your task logic here
  },
  '12h': () => {
    console.log('Running task every 12 hours');
    // Add your task logic here
  },
  '1d': () => {
    console.log('Running task every day');
    // Add your task logic here
  },
  '1w': () => {
    console.log('Running task every week');
    // Add your task logic here
  },
  '1mo': () => {
    console.log('Running task every month');
    // Add your task logic here
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    
  const { cron } = req.query;
    if (typeof cron !== 'string' || !Object.prototype.hasOwnProperty.call(tasks, cron)) {
        res.status(400).send('Invalid cron path');
        return;
    }
        const task = tasks[cron];

        if (task) {
          try {
            task();
            res.status(200).send(`Task for ${cron} executed successfully`);
          } catch (error) {
            console.error(`Error executing task for ${cron}:`, error);
            res.status(500).send('Internal Server Error');
          }
        } else {
          res.status(400).send('Invalid cron path');
        }
      }