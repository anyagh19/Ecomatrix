import React from 'react'

function layout({children} : {children : React.ReactNode}) {
  return (
    <div className='flex w-full min-h-screen justify-center items-center'>
      {children}
    </div>
  )
}

export default layout
