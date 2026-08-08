import { Button } from '@/components/ui/button'
import { MessageCircleMore } from 'lucide-react'

export const WhatsappButton: React.FC<{
  phone: string
}> = ({ phone }) => {
  return (
    <a
      href={`https://wa.me/${phone.replace(/[^\d]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0"
      aria-label={phone}
    >
      <Button
        variant="link"
        className="inline-flex h-auto items-center gap-2 whitespace-nowrap rounded-full bg-earth p-3 text-xs uppercase tracking-widest text-bg sm:rounded-md sm:px-6 sm:py-3 sm:tracking-[0.15em]"
      >
        <MessageCircleMore className="shrink-0"></MessageCircleMore>
        <span className="hidden sm:inline">{phone}</span>
      </Button>
    </a>
  )
}
