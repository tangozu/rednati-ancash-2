import type { Block } from 'payload'

export const ElDestino: Block = {
  slug: 'elDestino',
  interfaceName: 'ElDestinoBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '06 — El Destino',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Chavín de Huántar',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'recognition',
      type: 'text',
      defaultValue: 'Patrimonio de la Humanidad UNESCO · Desde 1985',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Sierra oriental de Ancash',
      required: true,
    },
    {
      name: 'altitude',
      type: 'text',
      defaultValue: '3,177 msnm',
      required: true,
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      defaultValue:
        'El destino final de Llamatrek es uno de los sitios arqueológicos más importantes del continente. Centro ceremonial de una civilización preinca que floreció entre 900 y 200 a.C., Chavín fue el primer gran horizonte cultural pan-andino.',
      required: true,
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      defaultValue:
        'Sus galerías subterráneas, el monolito Lanzón y sus estelas revelan un sistema de conocimiento astronómico, ritual y social extraordinariamente sofisticado. Llegar aquí caminando, como lo hacían los peregrinos, es la manera más auténtica de comprender su dimensión sagrada.',
      required: true,
    },
  ],
}
