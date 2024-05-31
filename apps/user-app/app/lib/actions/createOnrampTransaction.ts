'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import prisma from '@repo/db/client'

export async function createOnrampTransaction(
  provider: string,
  amount: number,
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !session.user?.id) {
    return {
      message: 'Unauthenticated request',
    }
  }
  const token = (Math.random() * 1000).toString()
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(session?.user?.id),
      provider,
      amount: amount * 100,
      token,
      status: 'Processing',
      startTime: new Date(),
    },
  })

  return {
    message: 'Done',
  }
}
