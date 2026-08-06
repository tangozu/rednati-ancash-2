import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export const EmailButton: React.FC<{
  email: string
}> = ({ email }) => {
  return (
    <a href={`mailto:${email}`}>
      <Button
        variant="link"
        className="inline-flex items-center gap-2 border border-black/15 px-6 py-3 text-xs uppercase tracking-[0.15em] text-black/80 transition-colors duration-300 hover:border-black/40 hover:text-black"
      >
        <Mail></Mail>
        {email}
      </Button>
    </a>
  )
}
