'use client'
import { Button } from '@repo/ui/button.tsx'
import { Card } from '@repo/ui/card.tsx'
import { Select } from '@repo/ui/select.tsx'
import { useState } from 'react'
import { TextInput } from '@repo/ui/textinput.tsx'
import { createOnrampTransaction } from '../app/lib/actions/createOnrampTransaction'

const SUPPORTED_BANKS = [
  {
    name: 'HDFC Bank',
    redirectUrl: 'https://netbanking.hdfcbank.com',
  },
  {
    name: 'Axis Bank',
    redirectUrl: 'https://www.axisbank.com/',
  },
]

export const AddMoney = () => {
  const [bank, setBank] = useState(SUPPORTED_BANKS[0])
  const [amount, setAmount] = useState(0)
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={'Amount'}
          placeholder={'Amount'}
          onChange={(e) => setAmount(Number(e))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setBank(
              SUPPORTED_BANKS.find((x) => x.name === value) ||
                SUPPORTED_BANKS[0],
            )
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnrampTransaction(bank?.name || '', amount)
              window.location.href = bank?.redirectUrl || ''
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  )
}
