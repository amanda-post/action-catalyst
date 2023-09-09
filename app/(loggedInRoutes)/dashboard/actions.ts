'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { db } from '~/lib/db';

export async function getUser() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

export async function getTasks() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const tasks = await db.task.findMany({
    where: {
      userId,
    },
  });
  return tasks;
}

export async function getRewards() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const rewards = await db.reward.findMany({
    where: {
      userId,
    },
    orderBy: {
      pointCost: 'asc',
    },
  });
  return rewards;
}

export async function getHistory() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const historyLogs = await db.history.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
  return historyLogs;
}

export type Task = Awaited<ReturnType<typeof getTasks>>[number];
export type Tasks = Task[];
export type Reward = Awaited<ReturnType<typeof getRewards>>[number];
export type Rewards = Reward[];
export type History = Awaited<ReturnType<typeof getHistory>>;

export async function addTask({
  description,
  points,
}: {
  description: string;
  points: number;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  await db.task.create({
    data: {
      userId,
      description,
      pointValue: points,
    },
  });
  revalidatePath('/dashboard');
}

export async function updateTask({
  id,
  description,
  points,
}: {
  id: number;
  description: string;
  points: number;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  await db.task.update({
    where: {
      id,
      userId,
    },
    data: {
      description,
      pointValue: points,
    },
  });
  revalidatePath('/dashboard');
}

export async function deleteTask({ id }: { id: number }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  await db.task.delete({
    where: {
      id,
      userId,
    },
  });
  revalidatePath('/dashboard');
}

export async function addReward({
  description,
  points,
}: {
  description: string;
  points: number;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  await db.reward.create({
    data: {
      userId,
      description,
      pointCost: points,
    },
  });
  revalidatePath('/dashboard');
}

export async function updateReward({
  id,
  description,
  points,
}: {
  id: number;
  description: string;
  points: number;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  await db.reward.update({
    where: {
      id,
      userId,
    },
    data: {
      description,
      pointCost: points,
    },
  });
  revalidatePath('/dashboard');
}

export async function deleteReward({ id }: { id: number }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  await db.reward.delete({
    where: {
      id,
      userId,
    },
  });
  revalidatePath('/dashboard');
}

export async function completeTask({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const task = await db.task.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!task) {
    throw new Error('Task not found or does not belong to the user');
  }

  await db.user.update({
    where: { id: userId },
    data: {
      totalPointsAvailable: {
        increment: task.pointValue * quantity,
      },
      totalPointsEarned: {
        increment: task.pointValue * quantity,
      },
    },
  });

  await db.history.create({
    data: {
      userId,
      description: task.description,
      quantity,
      pointValue: task.pointValue,
      pointValueChange: task.pointValue * quantity,
    },
  });

  revalidatePath('/dashboard');
}

export async function redeemReward({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const reward = await db.reward.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!reward) {
    throw new Error('Reward not found or does not belong to the user');
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (
    user?.totalPointsAvailable &&
    user?.totalPointsAvailable < reward.pointCost * quantity
  ) {
    throw new Error('Not enough points to redeem this reward');
  }

  await db.user.update({
    where: { id: userId },
    data: {
      totalPointsAvailable: {
        decrement: reward.pointCost * quantity,
      },
    },
  });

  await db.history.create({
    data: {
      userId,
      description: reward.description,
      quantity,
      pointValue: reward.pointCost,
      pointValueChange: -reward.pointCost * quantity,
    },
  });

  revalidatePath('/dashboard');
}
