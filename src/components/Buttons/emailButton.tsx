import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export const EmailButton: React.FC<{
  email: string
  label: string
}> = ({ email, label }) => {
  return (
    <a href={`mailto:${email}`}>
      <Button
        variant="link"
        className=" inline-flex items-center gap-2 border border-cream/15 px-6 py-3 text-xs uppercase tracking-[0.15em] text-cream/80 transition-colors duration-300 hover:border-cream/40 hover:text-cream"
      >
        <Mail></Mail>
        {label} {email}
      </Button>
    </a>
  )
}
