import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await axios.post('localhost:3000/users/create', { email, password });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
