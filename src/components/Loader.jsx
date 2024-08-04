import React from 'react'
import Loading from "../images/200w.gif"

const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader__imag">
            <img src={Loading} alt="" />
        </div>
    </div>
  )
}

export default Loader
 