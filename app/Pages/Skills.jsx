import React from 'react'
import {BadgeCheck} from 'lucide-react'
function Skills() {
  return (
    <section id='skill' className='bg-gray-50 py-14 flex  flex-col items-center px-10 '>
      <div className='text-center pb-10 '>
            <p className='text-4xl font-bold'>Skills</p>
            <p className='text-gray-400 text-sm'>My technical level</p>
      </div>
      {/* Skills */}
      <div className='md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5'>
      {/* Frontend developer */}
      <div className='text-center bg-white border px-10 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>Frontend Developer</h1>
          <div className='flex   space-x-16 '>
            <div className='space-y-4'>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> HTML </span>
              <span className='mr-6 text-gray-400 text-[12px]'>Basic </span>
              </p>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> CSS </span>
              <span className='ml-5 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> BootStrap </span>
              <span className='ml-5 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> TailwindCss </span>
              <span className='ml-5 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
            </div>

            <div className='space-y-4'>
            <p>
              <span className='flex gap-2'><BadgeCheck />JavaScript  </span>
              <span className='ml-7 text-gray-400 text-[12px]'>Intermediate </span>
            </p>
            <p>
              <span className='flex gap-2'><BadgeCheck />ReactJS</span>
              <span className='ml-7 text-gray-400 text-[12px]'>Intermediate </span>
            </p>
            <p>
              <span className='flex gap-2'><BadgeCheck /> NextJS</span>
              <span className='ml-7 text-gray-400 text-[12px]'>Intermediate</span>
            </p>
            <p>
              <span className='flex gap-2'><BadgeCheck /> Git/Github </span>
              <span className='ml-7 text-gray-400 text-[12px]'>Intermediate</span>
            </p>
            </div>
          </div>
        </div>
            {/* Backend developer */}
        <div className='text-center bg-white border px-10 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>Backend Developer</h1>
          <div className='flex   space-x-16 '>
            <div className='space-y-4'>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> PHP </span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> NodeJS </span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> MongoDB </span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
              <p>
              <span className='flex gap-2 '><BadgeCheck /> Strapi </span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate </span>
              </p>
            </div>

            <div className='space-y-4'>
            <p>
              <span className='flex gap-2'><BadgeCheck />Laravel  </span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate </span>
            </p>
            <p>
              <span className='flex gap-2'><BadgeCheck />MySQL</span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate </span>
            </p>
            <p>
              <span className='flex gap-2'><BadgeCheck /> SQL</span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate</span>
            </p>
            <p>
              <span className='flex gap-2'><BadgeCheck /> Docker</span>
              <span className='ml-8 text-gray-400 text-[12px]'>Intermediate</span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills