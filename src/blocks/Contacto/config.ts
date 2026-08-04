import type { Block } from 'payload'

export const Contacto: Block = {
  slug: 'contacto',
  interfaceName: 'ContactoBlock',
  fields: [
    {
      name: 'preTitle',
      type: 'text',
      defaultValue: 'Iniciar la experiencia',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: '¿Listo para caminar?',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Contacta directamente con la Asociación de Auxiliares de Montaña Olleros–Chavín.',
      required: true,
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'guide',
      type: 'text',
      defaultValue: 'Jorge Martel Alvarado',
      required: true,
    },
    {
      name: 'whatsapp',
      type: 'text',
      defaultValue: '+51 958 848 684',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'jorge.martel59@gmail.com',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: 'Pasaje Agustín Loli Nº 463 · Plazuela de la Soledad, Huaraz, Ancash, Perú',
      required: true,
    },
  ],
}
