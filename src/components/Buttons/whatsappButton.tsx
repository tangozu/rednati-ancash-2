import { Button } from '@/components/ui/button'
import { MessageCircleMore } from 'lucide-react'

export const WhatsappButton: React.FC<{
  phone: string
  label: string
}> = ({ phone, label }) => {
  return (
    <a
      href={`https://wa.me/${phone.replace(/[^\d]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="link"
        className="inline-flex items-center gap-2 bg-earth px-6 py-3 text-xs uppercase tracking-[0.15em] text-bg"
      >
        <MessageCircleMore></MessageCircleMore>
        {label} {phone}
      </Button>
    </a>
  )
}
