import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenido al panel administrativo de LlamaTrek</h4>
      </Banner>
      <p>
        Desde este panel podrá actualizar el contenido de su página web sin necesidad de
        conocimientos de programación.
      </p>
      <br />
      <p>
        La mayoría de las modificaciones se realizan desde la colección <strong><a href="/admin/collections/pages">Pages</a></strong>,
           donde podrá editar la información
           predeterminada del proyecto o agregar nuevo contenido, como formularios.
      </p>
      <p>
        También es posible crear o administrar formularios y otros elementos disponibles desde el
        panel.
      </p>
      <p>
        Para conocer el funcionamiento completo del administrador, le recomendamos revisar la
        documentación entregada con el proyecto, donde encontrará instrucciones detalladas para
        cada sección.
      </p>
      <br />
      <p>
        <strong>Importante:</strong> Antes de realizar cambios significativos, asegúrese de
        comprender la función de cada apartado para mantener la estructura y el diseño del sitio.
      </p>
    </div>
  )
}

export default BeforeDashboard
