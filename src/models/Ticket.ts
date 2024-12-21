import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for a Ticket
export interface ITicket extends Document {
    title: string;
    description: string;
    status: string;
}

// Create the Mongoose schema
const TicketSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Open' },
});

// Export the Mongoose model
const TicketModel: Model<ITicket> =
    mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);

export default TicketModel;
