"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image';
import gif from '../../../../assets/image/gif.gif';
import Link from 'next/link';
const Sialkot1 = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`https://www.admin777.pny-trainings.com/api/shortcourse/short-course-in-sialkot`);
        if (response.data && response.data.courses) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchCourses();

  }, []);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        {/* Semi-transparent background */}
        <div className="loader-overlay"></div>
        {/* Loader */}
        <div className="loaderContainer">
          {/* Use the gif as a loader */}
          <Image className="w-52 h-52" src={gif} alt="Loading..." />
        </div>
      </div>
    );
  }
  return (
    <>


      <section className='lg:h-[254px] bg-[#152438;] text-white flex flex-col justify-center items-center max-sm:p-5'>
        <div className='text-[48px] max-sm:text-[24px] font-semibold'>Sialkot</div>
        <div className='text-[20px] max-sm:text-[24px] font-semibold'>Short Courses</div>
        {/* <div className='text-[20px] font-normal max-sm:text-[16px] max-sm:text-center'>Learn more about the company and the team behind it.</div> */}
      </section>




      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'>
        {courses.map((course, index) => (
          <>
            <div key="{index}" classname="course-container ">
              {/* TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com */}
              <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                <Link href="">
                  <img className="rounded-t-lg h-52 w-full" src={course.post_image_thumb} alt />
                </Link>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {course.title}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {course.description_short}
                  </p>
                  <Link href={`/blog/short-course-in-sialkot/${course.url_slug}`}>
                    <button type="button" className="inline-block rounded bg-[#3f83f8] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>


          </>

        ))}
      </div >
    </>
  )
}

export default Sialkot1
