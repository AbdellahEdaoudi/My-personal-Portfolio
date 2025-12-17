const Award = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
)

const Briefcase = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const Headset = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
  </svg>
)

const StickyNote = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
    <path d="M15 3v6h6" />
  </svg>
)
import Image from "next/image";

function About({ content }) {
  if (!content) return null;

  return (
    <section id="about" className="py-4 md:min-h-screen">
      <div className="text-center">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-2 md:pt-7 px-4">
        <div className="flex flex-col-reverse  md:items-start items-center md:flex-row gap-6 md:gap-28">
          <Image src="/profile-pic.png" alt="Profile Picture"
            className="imganim md:w-80  w-56 md:block hidden "
            width={500} height={500}
          />
          <div className="space-y-4">
            <ul className="flex gap-4 items-center justify-center pt-4">
              <li className="flex flex-col items-center text-center bg-white p-4 rounded-md border">
                <Award />
                <span className="text-[13px]">{content.experience}</span>
                <span className="text-[10px] text-gray-400">
                  {content.experienceDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white py-4 md:px-4 px-2 rounded-md border">
                <Briefcase />
                <span className="text-[13px]">{content.completed}</span>
                <span className="text-[10px] text-gray-400">
                  {content.completedDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white px-5 duration-300 md:px-6 py-4 rounded-md border">
                <Headset />
                <span className="text-[13px]">{content.support}</span>
                <span className="text-[10px] text-gray-400">
                  {content.supportDetail}
                </span>
              </li>
            </ul>
            <p className="text-justify md:w-[400px] text-gray-700 px-2">
              {content.description}
            </p>
            <div className="flex items-center justify-center">
              <a
                href={content.Cv}
                target="_blank"
                // download={content.Cv}
                className="flex p-3 rounded-lg bg-black text-white gap-2"
              >
                {content.downloadCv} <StickyNote />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
