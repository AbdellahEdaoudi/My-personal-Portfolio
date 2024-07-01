import React from 'react'
import {BadgeCheck} from 'lucide-react'
function Skills() {
  const FrontEnd = [
    { name: "NextJS(Reactjs)", ds: "Intermediate" },
    { name: "BootStrap", ds: "Intermediate" },
    { name: "TailwindCss", ds: "Intermediate" },
    { name: "Git/Github", ds: "Intermediate" },
  ];
  const BackEnd = [
    { name: "NodeJS", ds: "Intermediate" },
    { name: "MongoDB", ds: "Intermediate" },
    { name: "Docker", ds: "Intermediate" }
  ];
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
          <div className='grid grid-cols-2 gap-5'>
            {FrontEnd.map((fr,i)=>{
              return(
                <div key={i}>
                  <span className='flex gap-2'><BadgeCheck /> <span>{fr.name}</span></span>
                  {/* <span className='ml-4 text-gray-400 text-[12px]'>{fr.ds}</span> */}
                </div>
              )
            })}
          </div>
        </div>
        {/* Backend developer */}
            <div className='text-center bg-white border px-10 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>Backend Developer</h1>
          <div className='grid grid-cols-2 gap-5'>
            {BackEnd.map((fr,i)=>{
              return(
                <div key={i}>
                  <span className='flex gap-2'><BadgeCheck /> <span>{fr.name}</span></span>
                  {/* <span className='ml-7 text-gray-400 text-[12px]'>{fr.ds}</span> */}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills