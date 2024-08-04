import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
 <div className="center">
  <Link to="/"  className='btn primary'>
  Allez-y a la page d'accueil
  </Link>
  <h2>Page non trouvée</h2>
 </div>
    </section>
  )
}

export default ErrorPage
 