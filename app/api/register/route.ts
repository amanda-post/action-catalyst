import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  console.log({ data }, '-=-=-=-=-==-==-=-=-');
  const { username, password } = registerUserSchema.parse(data);
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user !== null) {
    return NextResponse.json({ user: null, message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    user: newUser,
    message: 'User created successfully',
  });
}
