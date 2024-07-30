"use client"

import React, { useEffect, useState } from "react";
import grouppicture from "../../assets/images/responsive.png";
import ladymobile from '../../assets/image/ladymobile.png';
import wahab from '../../assets/image/Wahab-Yunuspng.png';
import { motion } from "framer-motion";
import axios from "axios";
import { aboutdata } from "../../Components/Data/Data";
import Image from "next/image";


const About = () => {
  const [metaData, setMetaData] = useState({ title: '', description: '' });

  useEffect(() => {
    // Assuming you're fetching the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.admin777.pny-trainings.com/api/metas/about');
        if (response.data && response.data.metas.length > 0) {
          const { meta_title, meta_description } = response.data.metas[0];
          setMetaData({ title: meta_title, description: meta_description });
        }
      } catch (error) {
        console.error('There was an error fetching the meta data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render


  // _______________________________________________________________________________________
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.4,
      },
    },
  };

  return (
    <>



      <main className="bg-white dark:bg-slate-800   ring-1 ring-slate-900/5 shadow-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section-1 */}
          <section className="bg-[#152438] max-sm:h-auto md:p-20 lg:h-[300px]  text-white max-sm:py-10">
            <div className="grid ">
              <div
                style={{ animation: "riseUp 2s ease-out forwards" }}
                className="lg:text-5xl max-sm:text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500  font-bold max-sm:text-3xl md:text-center md:text-3xl"
              >
                About Us
              </div>
              <div className="text-center text-2xl mt-5">
                We drive leaders in the technical world
              </div>
            </div>
          </section>

          {/* Section-2 */}
          <section className="grid lg:grid-cols-12 gap-4 lg:h-auto md:mt-5 px-4 md:px-10">
            <div className="col-span-6 flex flex-col justify-center p-4 lg:p-10">
              <h2 className="text-3xl max-sm:text-center lg:text-[42px] font-bold text-gray-900 dark:text-white">
                Who we are?
              </h2>
              <h3 className="text-2xl max-sm:text-center lg:text-[26px] font-bold text-red-600 dark:text-white mt-3">
                PNY Trainings: A renowned IT Training institute in Pakistan since
                2014
              </h3>

              <p className="text-lg lg:text-[20px] text-gray-700 dark:text-white text-justify max-sm:text-center mt-4">
                Offering professional IT diplomas and short courses for students
                and professionals seeking career growth. As pioneers in
                comprehensive training, we have helped thousands of students
                secure lucrative jobs in the expanding IT industry. With top-level
                industry experienced instructors and multiple branches nationwide,
                we are committed to empowering individuals in their IT journey.
                Join us today and unlock your potential in the world of
                technology.
              </p>
            </div>
            <div className="col-span-6 flex justify-center items-center lg:justify-end p-4">
              <Image
                className="w-full lg:w-[591px] lg:h-[375px] object-cover"
                src={grouppicture}
                alt="Group Picture"
              />
            </div>
          </section>

          <div className="flex flex-col lg:flex-row bg-[#F9FAFB] text-white overflow-hidden">
            {/* Image Section */}
            <div className="lg:flex lg:items-center lg:justify-center lg:w-1/2">
              {/* Mobile Image */}
              <Image
                className="w-full h-full object-cover lg:hidden max-sm:p-3 "
                src={ladymobile}
                alt="Mobile"
              />
              {/* Desktop Image */}
              <Image
                className="hidden lg:block lg:w-1/2 h-auto object-cover"
                src={ladymobile}
                alt="Desktop"
              />
            </div>
            {/* Content Section */}
            <div className="flex flex-col justify-center p-8 lg:w-1/2 space-y-6">
              {/* Title Section */}
              <div>
                <h2 className="text-3xl font-extrabold text-center lg:text-left text-[#F10900]">
                  Our Worth Our Achievements!
                </h2>
                <p className="text-xl text-center lg:text-left mt-2 text-black">
                  We’re only just getting started on our journey
                </p>
              </div>
              {/* Stats Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#308AFF] p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
                    <p className="text-2xl font-bold">75000+</p>
                    <p>Alumni</p>
                  </div>
                  <div className="bg-[#308AFF] p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
                    <p className="text-2xl font-bold">100+</p>
                    <p>Professional Programs</p>
                  </div>
                  <div className="bg-[#308AFF] p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
                    <p className="text-2xl font-bold">150</p>
                    <p>Instructor</p>
                  </div>
                  <div className="bg-[#308AFF] p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
                    <p className="text-2xl font-bold">+80</p>
                    <p>Mou’s Sign</p>
                  </div>
                </div>
              </div>
              {/* Additional Info */}
              <div className="w-full bg-[#308AFF] p-3 rounded-full text-center shadow-lg">
                <span className="text-sm font-medium tracking-wide">
                  Multiple Branches in Pakistan
                </span>
              </div>
            </div>
          </div>

          {/* Section-4 */}
          <section className=" xl:h-auto lg:h-auto md:h-auto max-sm:h-auto p-5 max-sm:p-2">
            <div className="flex justify-center">
              <p className="text-[18px] sm:text-[30px] md:font-bold lg:text-[42px] text-center font-bold dark:text-white w-full px-4 lg:w-[1084px]">
                Wahab Yunus, as the CEO of PNY Trainings, is unlocking the
                potential in youth to be victorious.
              </p>
            </div>

            <div className="grid xl:grid-cols-2 lg:grid-cols-2 text-white rounded md:grid-cols-1 md:h-auto max-sm:grid-cols-1 xl:mt-20  bg-[#152438] max-sm:h-auto lg:h-[420px] xl:w-[1266px] mx-auto max-sm:mt-10 md:mt-10">
              <div className="p-10">
                <div className="lg:text-[36px] font-semibold">CEO Message</div>
                <div className="lg:w-[530px]  xl:w-[624px] mt-[24px]">
                  Diversity and inclusion of thought, skill, knowledge, and
                  culture make PNY Trainings more competitive, more resilient, and
                  better. Diversity strengthens us by promoting unique viewpoints
                  and challenging each of us, every day, to think beyond our
                  traditional frames of reference. We are committed to building a
                  talented and diverse workforce, and to creating an environment
                  in which every STUDENT has the opportunity to excel based on his
                  or her performance. We believe the best way to learn is by
                  putting your skills to use. I warmly welcome you to visit by
                  contacting us, and discover firsthand what makes PNY Trainings
                  special.
                </div>
                <div className="mt-[24px] text-[22px] font-bold">
                  Wahab Yunus (CEO PNY Trainings)
                </div>
              </div>
              <div className=" lg:relative bottom-20  xl:justify-center md:justify-center lg:justify-end flex ">
                <Image
                  className="w-[450px] h-[500px] max-sm:h-[350px]"
                  src={wahab}
                  alt=""
                />
              </div>
            </div>
          </section>

          {/* section-5 */}
          <section className=" bg-white dark:bg-slate-800 ring-1 ring-slate-900/5   lg:p-5 lg:mt-10">
            <div
              className="howwework font-bold text-center md:text-2xl lg:text-4xl dark:text-white max-sm:text-2xl"
              id="abc"
            >
              We Connect, We Grow Together
            </div>
            <div className="howwework text-center max-sm:p-2 lg:p-3 lg:mb-10 dark:text-white">
              We consider your part to empower, develop, and embrace the everyday
              chore.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-3 max-sm:p-3">
              {
                aboutdata.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="stats shadow-xl hover:bg-blue-500 hover:text-white">
                        <div className="stat">
                          <div className="img flex justify-center">
                            <Image className='h-16' src={data.imgSrc} alt="" />
                          </div>
                          <div className="text-center text-xl font-bold dark:text-white">{data.title}</div>
                          <div className="text-center dark:text-white">{data.description}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  )
                })
              }
            </div>
          </section>
        </motion.div>
      </main>
    </>
  );
};

export default About;
