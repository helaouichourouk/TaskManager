import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/dbConnect';
import TicketModel from '../../../models/Ticket';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await connectDB();

    const { method, query } = req;
    const { id } = query;

    try {
        switch (method) {
            case 'GET': {
                const ticket = await TicketModel.findById(id);
                if (!ticket) {
                    res.status(404).json({ error: 'Ticket not found' });
                    return;
                }
                res.status(200).json(ticket);
                break;
            }
            case 'PUT': {
                const updatedTicket = await TicketModel.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json(updatedTicket);
                break;
            }
            case 'DELETE': {
                await TicketModel.findByIdAndDelete(id);
                res.status(204).end();
                break;
            }
            default: {
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
