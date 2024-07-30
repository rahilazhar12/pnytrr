
"use client"
import React, { useState, useEffect } from "react";

// import gif from '../../assets/image/gif.gif'
import gif from '../../assets/image/gif.gif';
import Image from "next/image";
import Link from "next/link";

const Fastbootcamp = () => {
  const [data, setData] = useState({ page: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://www.admin777.pny-trainings.com/api/pages/fast-track-pro-bootcamps"
        );
        const fetchedData = await response.json();
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };

    fetchData();

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
    <main className="">
      <div className="">


        <section>
          <div className="">
            <img className="w-full" src={data.page_banner} alt="Boot Camp" />
          </div>
        </section>

        <section>
          {data.page.map((item) => (
            <div key={item.id}>
              <h2 className="p-10 text-xl font-bold">
                Top Courses in {item.name}
              </h2>

              <div className="grid grid-cols-4 max-sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4">
                {item.obj.map((course) => (
                  <div key={course.id} className="p-4  w-full">
                    <div className="p-4 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                      <Link href={`/${course.url_slug}`}>
                        <img
                          src={course.course_image}
                          alt="FFp"
                          className=""
                        />
                      </Link>
                      <div className="flex justify-between w-50 mb-4"></div>
                      <div className="w-full">
                        <h2 className="title-font font-medium text-sm text-gray-900 mb-3">
                          {course.name}
                        </h2>
                        {/* <h2 className="text-black">
                          Course Fee : {course.monthly_tution_fee}
                        </h2> */}
                        {/* <h3 className="text-red-500 mt-1 mb-1">
                          {course.teacher}
                        </h3> */}
                      </div>
                      <Link href={`/${course.url_slug}`}>
                        <button className="bg-blue-500 px-4 py-2 rounded text-white">More Details</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Fastbootcamp;
