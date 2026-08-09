import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export const EmailButton: React.FC<{
  email: string
}> = ({ email }) => {
  return (
    <a href={`mailto:${email}`} className="max-w-full">
      <Button
        variant="link"
        className="inline-flex h-auto max-w-full items-center gap-2 whitespace-normal break-all border border-earth-accent/15 px-6 py-3 text-xs uppercase tracking-[0.15em] text-earth-accent/80 transition-colors duration-300 hover:border-earth-accent/40 hover:text-earth-accent"
      >
        <Mail></Mail>
        {email}
      </Button>
    </a>
  )
}
