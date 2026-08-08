import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export const EmailButton: React.FC<{
  email: string
}> = ({ email }) => {
  return (
    <a href={`mailto:${email}`} className="max-w-full">
      <Button
        variant="link"
        className="inline-flex h-auto max-w-full items-center gap-2 whitespace-normal break-all border border-cream/15 px-6 py-3 text-xs uppercase tracking-[0.15em] text-cream/80 transition-colors duration-300 hover:border-cream/40 hover:text-cream"
      >
        <Mail></Mail>
        {email}
      </Button>
    </a>
  )
}
