import { NextApiRequest, NextApiResponse } from 'next'; // Import the correct types
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: 'Method Not Allowed', success: false });
  }

  const { email, password, name } = req.body;

  // Connect to database
  await connectToDatabase();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already exists', success: false });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create the new user
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  await newUser.save();

  return res
    .status(200)
    .json({ message: 'User created successfully', success: true });
}
