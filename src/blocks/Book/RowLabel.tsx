'use client'
import { BookBlock } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<BookBlock['paginas']>[number]>()

  const label = data?.data?.label
    ? `Página ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.label}`
    : 'Página'

  return <div>{label}</div>
}
