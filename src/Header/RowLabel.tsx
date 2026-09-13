'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const groupPrefix = data?.data?.group ? `[${data.data.group}] ` : ''
  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${groupPrefix}${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
