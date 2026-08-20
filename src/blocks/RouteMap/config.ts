import type { Block } from 'payload'

export const RouteMap: Block = {
  slug: 'routeMap',
  interfaceName: 'RouteMapBlock',
  labels: {
    singular: 'Mapa de Ruta',
    plural: 'Mapas de Ruta',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '03 — La Ruta',
    },
    {
      name: 'difficulty',
      type: 'select',
      label: 'Dificultad',
      defaultValue: 'moderada',
      options: [
        { label: 'Fácil', value: 'facil' },
        { label: 'Moderada', value: 'moderada' },
        { label: 'Difícil', value: 'dificil' },
        { label: 'Muy difícil', value: 'muy-dificil' },
      ],
    },
    {
      name: 'gpxFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Archivo GPX',
      admin: {
        description: 'Sube un archivo .gpx con la ruta del trek.',
      },
    },
    {
      name: 'autoIncludeGpsMedia',
      type: 'checkbox',
      label: 'Incluir automáticamente fotos con ubicación GPS',
      defaultValue: false,
      admin: {
        description:
          'Si se activa, todas las imágenes de la biblioteca de medios que tengan coordenadas GPS se mostrarán como marcadores en el mapa, además de las seleccionadas manualmente abajo.',
      },
    },
    {
      name: 'markers',
      type: 'array',
      label: 'Marcadores',
      labels: {
        singular: 'Marcador',
        plural: 'Marcadores',
      },
      admin: {
        description:
          'Fotos a mostrar como marcadores en el mapa. Solo se listan imágenes que ya tienen coordenadas GPS extraídas de sus metadatos.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Foto',
          filterOptions: {
            latitude: { exists: true },
            longitude: { exists: true },
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Descripción (opcional)',
        },
      ],
    },
  ],
}
