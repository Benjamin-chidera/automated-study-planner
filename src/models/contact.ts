import { Schema, models, model } from "mongoose";

interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
}


const ContactSchema = new Schema<Contact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const ContactModel = models.Contact || model<Contact>("Contact", ContactSchema);
