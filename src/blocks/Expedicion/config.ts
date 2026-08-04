import type { Block } from 'payload'

export const Expedicion: Block = {
  slug: 'expedicion',
  interfaceName: 'ExpedicionBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '04 — La Expedición',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tres días. Una transformación.',
      required: true,
    },
    {
      name: 'days',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          title: 'Ascenso desde Olleros',
          altitude: '2,800 → 4,100 msnm',
          duration: '5–6 horas',
          paragraph:
            'Partida desde el pueblo de Olleros, remontando el cañón del río Yanayacu entre pajonales y queñuales. Las llamas marcan el ritmo del camino. Primera noche en Campo Shongo, bajo un cielo sin contaminación lumínica.',
        },
        {
          title: 'El Paso de los Andes',
          altitude: '4,100 → 4,700 → 3,800 msnm',
          duration: '7–8 horas',
          paragraph:
            'La jornada más exigente y más intensa. El paso Yanashallash a 4,700 msnm ofrece vistas que detienen la respiración. Al descender, lagunas glaciares de agua turquesa reflejan los nevados de la Cordillera Blanca.',
        },
        {
          title: 'Llegada a Chavín',
          altitude: '3,800 → 3,177 msnm',
          duration: '4–5 horas',
          paragraph:
            'Descenso final hacia el Valle del Mosna. El Centro Ceremonial de Chavín de Huántar aparece entre los cerros como una revelación. Visita guiada al sitio Patrimonio de la Humanidad que floreció entre 900 y 200 a.C.',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altitude',
          type: 'text',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
