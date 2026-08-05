import React from 'react'

import './index.scss'

const AdminNavBrand: React.FC = () => {
  return (
    <div className="admin-nav-brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/rednati.ico" alt="RedNatí" className="admin-nav-brand__icon" />
      <span className="admin-nav-brand__text">RedNatí</span>
    </div>
  )
}

export default AdminNavBrand
