import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa6'

export const WhatsappButton: React.FC<{
  phone: string
}> = ({ phone }) => {
  return (
    <a
      href={`https://wa.me/${phone.replace(/[^\d]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-full"
      aria-label={phone}
    >
      <Button
        variant="link"
        className="inline-flex h-auto max-w-full items-center gap-2 whitespace-normal break-all bg-earth px-6 py-3 text-xs uppercase tracking-[0.15em] text-bg transition-colors duration-300 hover:bg-earth-dark"
      >
        <FaWhatsapp />
        {phone}
      </Button>
    </a>
  )
}
