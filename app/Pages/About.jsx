import React from "react";
import { Award, Briefcase, Headset, StickyNote } from "lucide-react";

function About() {
  return (
    <section id="about" className="bg-gray-50">
      <div className="text-center">
        <p className="text-4xl font-bold">About Me</p>
        <p className="text-gray-400 text-sm">My introduction</p>
      </div>

      <div className=" md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-14 px-4">
        <div className="flex flex-col md:items-start  items-center  md:flex-row md:space-x-28">
          <img
            src="./profile-pic.png"
            className="rounded-lg pb-8 imganim2 "
            width={330}
            height={300}
          />
          <div className="space-y-4 ">
            <ul className="flex gap-4 items-center justify-center pt-2 ">
              <li className="flex flex-col items-center text-center bg-white space-y-1 py-3 px-6  rounded-md border">
                <Award />
                <span className="text-[13px]">Experience</span>
                <span className="text-[10px] text-gray-400 ">
                  1 years Working
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white  space-y-1 py-3 px-8  rounded-md border">
                <Briefcase />
                <span className="text-[13px]">Completed</span>
                <span className="text-[10px] text-gray-400 ">+3 Projects</span>
              </li>
              <li className="flex flex-col items-center text-center bg-white  space-y-1 py-3 px-8  rounded-md border">
                <Headset />
                <span className="text-[13px]">Support</span>
                <span className="text-[10px] text-gray-400 ">Online 24/7</span>
              </li>
            </ul>
            <ul className="text-justify w-[400px] text-gray-700 px-2 ">
            MERN Stack Developer creating well-designed, high-performance code. I specialize in building responsive
            websites and apps with a mobile-first approach, ensuring seamless experiences across all devices.
            </ul>
            <div className="flex items-center justify-center">
              <a
                href="./CvAbdellahEdaoudi.pdf"
                target="_blank"
                download="CvAbdellahEdaoudi.pdf"
                className="flex p-3 rounded-lg   bg-black text-white gap-2"
              >
                Download Cv <StickyNote />
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
