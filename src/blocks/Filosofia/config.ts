import type { Block } from 'payload'

export const Filosofia: Block = {
  slug: 'filosofia',
  interfaceName: 'FilosofiaBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '03 — Filosofía',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'El Sumak Kawsay (Buen Vivir) como principio de cada paso',
      required: true,
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          subtitle: 'Aliadas Ecológicas',
          paragraph:
            'Las llamas no son un atractivo. Son compañeras de camino y guardianas del ecosistema andino —símbolo vivo de una relación milenaria entre el ser humano y la naturaleza.',
        },
        {
          subtitle: 'Espiritualidad Andina',
          paragraph:
            'Cada paso en este camino es un acto de comunicación con la Pachamama. La ruta Olleros–Chavín es un territorio sagrado donde el tiempo se mide en estrellas y nieves eternas.',
        },
        {
          subtitle: 'Comunidad Viva',
          paragraph:
            'La Asociación de Auxiliares de Montaña Olleros–Chavín guía cada expedición sin intermediarios. Cada inversión retorna directamente a las familias que custodian este camino.',
        },
      ],
      fields: [
        {
          name: 'subtitle',
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
