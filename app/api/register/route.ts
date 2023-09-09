import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (user !== null) {
    return NextResponse.json({ user: null, message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    user: newUser,
    message: 'User created successfully',
  });
}
