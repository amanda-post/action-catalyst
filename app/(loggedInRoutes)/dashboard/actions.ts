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
  const task = await db.task.create({
    data: {
      userId,
      description,
      pointValue: points,
    },
  });
  revalidatePath('/dashboard');
  return task;
}

// export type Task = Awaited<ReturnType<typeof getTasks>>[number];
// export type Tasks = Task[];

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

  const task = await db.task.update({
    where: {
      id,
      userId,
    },
    data: {
      description,
      pointValue: points,
    },
  });
  return task;
}

export async function deleteTask({ id }: { id: number }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const task = await db.task.delete({
    where: {
      id,
      userId,
    },
  });
  return task;
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

  const reward = await db.reward.create({
    data: {
      userId,
      description,
      pointCost: points,
    },
  });
  return reward;
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

export type Reward = Awaited<ReturnType<typeof getRewards>>[number];
export type Rewards = Reward[];

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

  const reward = await db.reward.update({
    where: {
      id,
      userId,
    },
    data: {
      description,
      pointCost: points,
    },
  });
  return reward;
}

export async function deleteReward({ id }: { id: number }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error('User not found');

  const reward = await db.reward.delete({
    where: {
      id,
      userId,
    },
  });
  return reward;
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

  const updatedUser = await db.user.update({
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

  const history = await db.history.create({
    data: {
      userId,
      description: task.description,
      quantity,
      pointValue: task.pointValue,
      pointValueChange: task.pointValue * quantity,
    },
  });

  return { task, updatedUser, history };
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

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      totalPointsAvailable: {
        decrement: reward.pointCost * quantity,
      },
    },
  });

  const history = await db.history.create({
    data: {
      userId,
      description: reward.description,
      quantity,
      pointValue: reward.pointCost,
      pointValueChange: -reward.pointCost * quantity,
    },
  });

  return { reward, updatedUser, history };
}
