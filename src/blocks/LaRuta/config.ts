import type { Block } from 'payload'

export const LaRuta: Block = {
  slug: 'laRuta',
  interfaceName: 'LaRutaBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '02 — La Ruta',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Llamatrek Olleros–Chavín: Cultura viva y Trekking con llamas en alta montaña',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      defaultValue:
        'Un sendero pre-inca de tres días a través de la Cordillera Blanca de Ancash. El camino asciende desde el poblado de Olleros cruzando pasos cordilleranos a 4,700 metros sobre el nivel del mar.',
      required: true,
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      defaultValue:
        'Al final del recorrido aguarda el Centro Ceremonial de Chavín de Huántar —Patrimonio de la Humanidad UNESCO desde 1985—, testimonio de una civilización que moldeó el mundo andino tres mil años atrás.',
      required: true,
    },
    {
      name: 'days',
      type: 'text',
      defaultValue: '3',
      required: true,
    },
    {
      name: 'nights',
      type: 'text',
      defaultValue: '2',
      required: true,
    },
    {
      name: 'kilometers',
      type: 'text',
      defaultValue: '37 km en etapas de 12, 15 y 10 Km.',
      required: true,
    },
    {
      name: 'people',
      type: 'text',
      defaultValue: '8',
      required: true,
    },
    {
      name: 'stages',
      type: 'text',
      defaultValue: '3',
      required: true,
    },
  ],
}
