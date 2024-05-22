// middlewares/errorHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const errorHandler = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res);
  } catch (err: any) {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
  }
};

export default errorHandler;
