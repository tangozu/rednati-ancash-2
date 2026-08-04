import type { Field } from 'payload'

export const llamaTrekHeroFields: Field = {
  name: 'llamaTrekHeroFields',
  type: 'group',
  required: true,
  fields: [
    {
      name: 'rednatiLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'llamaTrekLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
      defaultValue: 'Ancash',
      required: true,
    },
    {
      name: 'altitude',
      type: 'text',
      defaultValue: '4,700 MSNM',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'LLAMATREK',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Ruta Ancash "Trazando nuevas rutas, nuevas historias" Una ruta ancestral. Tres días entre los Andes. Olleros a Chavín de Huántar con llamas como aliadas ecológicas.',
      required: true,
    },
    {
      name: 'emailContact',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Reserva:',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'jorge.martel59@gmail.com',
          required: true,
        },
      ],
    },
    {
      name: 'whatsappContact',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Reserva:',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+51 958 848 684',
          required: true,
        },
      ],
    },
    {
      name: 'coordinates',
      type: 'text',
      defaultValue: "9°35'S 77°10'W",
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Ancash · Perú',
      required: true,
    },
  ],
}
