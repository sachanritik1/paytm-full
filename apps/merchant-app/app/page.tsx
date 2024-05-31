'use client'

import { useBalance } from '@repo/store/hooks/useBalance.ts'

export default function () {
  const balance = useBalance()
  return <div>hi there {balance}</div>
}
