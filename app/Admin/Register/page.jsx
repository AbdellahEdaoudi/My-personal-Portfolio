import Image from 'next/image'
import React from 'react'

export const metadata = {
  title: 'Register',
  alternates: {
    canonical: '/Admin/Register',
  },
}

function page() {
  return (
    <div className='flex items-center justify-center py-10'>
      <Image alt="" src={"/unauthorized.png"} width={500} height={500} className='rounded-md' />
    </div>
  )
}

export default page