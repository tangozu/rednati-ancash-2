import type { Block } from 'payload'

export const Manifiesto: Block = {
  slug: 'manifiesto',
  interfaceName: 'ManifiestoBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '01 — Manifiesto',
      required: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      defaultValue:
        'Hay caminos que no son rutas turísticas. Son corredores de memorias vivas. Pasos que generaciones recorrieron antes que nosotros, y que hoy compartimos como acto de preservación cultural.',
      required: true,
    },
  ],
}
