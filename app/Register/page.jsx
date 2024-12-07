import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className='flex items-center justify-center py-10'>
        <Image src={"/prfl.png"} width={500} height={500} className='rounded-md' />
    </div>
  )
}

export default page