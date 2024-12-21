import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/dbConnect';
import TicketModel from '../../../models/Ticket';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await connectDB();

    const { method } = req;

    try {
        switch (method) {
            case 'GET': {
                const tickets = await TicketModel.find({});
                res.status(200).json(tickets);
                break;
            }
            case 'POST': {
                const newTicket = await TicketModel.create(req.body);
                res.status(201).json(newTicket);
                break;
            }
            default: {
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
