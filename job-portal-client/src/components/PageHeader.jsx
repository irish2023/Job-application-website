import React from 'react'

const PageHeader = ({title, path}) => {
  return (
    <div className='bg-[#FAFAFA] rounded flex items-center justify-center py-24 mt-3 '>
    <div>
    <h1 className=' text-blue font-semibold text-3xl mb-1 text-center'> {title}</h1>
    <p className=' text-sm text-center'><a href='/'>Home </a> / {path} </p>

  </div>
    </div>
  )
}

export default PageHeader