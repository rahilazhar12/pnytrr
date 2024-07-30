'use client'

import React, { useEffect, useState } from "react";
import gif from '../../../assets/image/gif.gif';
import instructoricon from '../../../assets/image/Instructoricon.png';
import Link from "next/link";
import Image from "next/image";

const Clientcourses = ({ params }) => {
  const slug = params.slug;
  const [category, setCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.admin777.pny-trainings.com/api/category/${slug}`
        );
        if (response.ok) {
          const {
            category,
            category_courses: courses,
            category_instructors: instructors,
          } = await response.json();
          setCategory(category);
          setCourses(courses);
          setInstructors(instructors);
        } else {
          console.error(`Failed to fetch data for category slug: ${slug}`);
          setError(`Failed to fetch category data. Please try again later.`);
        }
      } catch (error) {
        console.error(`Error fetching data for category slug: ${slug}:`, error);
        setError(`Failed to fetch category data. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [slug]);

  // useEffect(() => {
  //   const handlePopState = () => {

  //   };

  // //   window.addEventListener('popstate', handlePopState);

  // //   return () => window.removeEventListener('popstate', handlePopState);
  // // }, []);

  // // useEffect(() => {
  // //   if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  // //     window.history.scrollRestoration = 'manual';
  // //   }
  // // }, []);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader-overlay"></div>
        <div className="loaderContainer">
          <Image className="w-52 h-52" src={gif} alt="Loading..." loading="lazy" width={208} height={208} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div>
        <div className="main">
          <section className="text-gray-600 body-font bg-[#152438]">
            <div className="container py-20 mx-auto">
              <div className="flex flex-col text-center w-full">
                {category && (
                  <>
                    <h1 className="text-white max-sm:text-3xl md:text-4xl mb-4 font-bold">
                      Courses Offered in {category.name}
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-sm text-white">
                      {category.description_short}
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="text-gray-600 body-font bg-gray-100 dark:bg-slate-800">
          <div className="container px-5 py-20 mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 ml-5 dark:text-white">
              Available Courses
            </h1>
            <div className="flex flex-wrap -m-4 items-center justify-center">
              {courses.length > 0 &&
                courses.map((item, index) => (
                  <div key={index} className="p-4 lg:w-1/4 md:w-1/2 w-full">
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2">
                      <Link href={`/${item.url_slug}`}>
                        <div className="h-40 w-full overflow-hidden">
                          <Image
                            src={item.course_image}
                            alt={item.name}
                            loading="lazy"
                            className="object-cover w-full h-full"
                            width={640}
                            height={360}
                          />
                        </div>
                      </Link>
                      <div className="p-6">
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                          {item.name}
                        </h2>
                        <Link href={`/${item.url_slug}`}>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">
                            More Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font shadow-md bg-gray-100 dark:bg-slate-800 text-center pt-16">
          <h1 className="text-black sm:text-3xl text-2xl text-center title-font text-gray-900 dark:text-white mb-5 font-bold">
            Most Popular Instructors in {category?.name}
          </h1>
          <div className="container px-5 py-2 mx-auto">
            <div className="flex flex-wrap -m-4">
              {instructors.length > 0 &&
                instructors.slice(0, 8).map((x, index) => (
                  <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2">
                      <Link href='' className="block relative h-40 rounded overflow-hidden">
                        <Image
                          alt="instructor"
                          loading="lazy"
                          className="object-cover object-center w-32 h-32 mx-auto mt-4"
                          src={instructoricon}
                          width={128}
                          height={128}
                        />
                      </Link>
                      <div className="p-6">
                        <h3 className="text-lg tracking-widest title-font text-black dark:text-white font-bold">
                          {x.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Clientcourses;
