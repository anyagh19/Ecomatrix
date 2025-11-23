import React from 'react'

function layout({children} : {children : React.ReactNode}) {
  return (
    <div className='p-2'>
      {children}
    </div>
  )
}

export default layout
