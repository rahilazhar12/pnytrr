/* global gtag */
"use client"

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from 'framer-motion';
import arfatower from '../../assets/image/Image.png';
import { contactus } from "../../Components/Data/Data";
import Image from "next/image";

const Contactus = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  function SubmitData(e) {
    e.preventDefault();
    setIsSubmitting(true); // Start submission
    var formData = new FormData();

    // Append the data to the FormData object
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("comment", comment);
    if (selectedCourse) {
      formData.append("course_name", selectedCourse.course_name);
    }

    // formData.append('comment', comment);

    // Use fetch to send the request
    fetch("https://www.admin777.pny-trainings.com/api/contact", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message, {
          duration: 5000,
        });
        setIsSubmitting(false); // End submission on success
        // Add Google Ads Conversion Tracking
        if (typeof gtag === "function") {
          gtag("event", "conversion", {
            send_to: "AW-11426324515/-gJOCKL1pvsYEKPAv8gq",
            value: 1.0,
            currency: "USD",
          });
        }

        setName("");
        setPhone("");
        setEmail("");
        setComment("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSubmitting(false); // End submission on error
      });
  }


  useEffect(() => {
    fetch('https://www.admin777.pny-trainings.com/api/contact/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data.courses_list);
        setFilteredCourses(data.courses_list);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setFilteredCourses(courses.filter(course =>
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setIsDropdownOpen(false); // Optionally close the dropdown after selection
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: '-100vw'
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.4
      }
    },
  };



  return (
    <>

      <motion.div

        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section className="lg:h-[254px] bg-[#152438;] text-white flex flex-col justify-center items-center max-sm:p-5">
          <div className="text-[48px] max-sm:text-[24px] font-semibold riseUp 1s ease-out forwards space-y-3">
            <h1
              className="text-white text-2xl md:text-6xl font-bold -z-50 text-center"
              style={{
                animation: 'riseUp 2s ease-out forwards', // Change the duration and ease as needed
              }}
            >
              Contact Us

            </h1>
            <h4 className="text-center text-sm md:text-xl">Our Team is always ready to help</h4>
          </div>
          {/* <div className='text-[20px] font-normal max-sm:text-[16px] max-sm:text-center'>Learn more about the company and the team behind it.</div> */}
        </section>

        <section className="bg-[#f0f2f5]">
          <div className="grid lg:grid-cols-2">
            <div>
              <Image className=" lg:h-full md:w-full" src={arfatower} alt="" />
            </div>
            <div>
              <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-black">
                  Contact Us with Your Queries
                </h2>
                {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">You can reach us anytime via <span className='text-[#308AFF]'>hr@pnytrainings.com</span></p> */}
                <form action="#" className="space-y-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Your name"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600  dark:placeholder-white dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="you@company.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="+92 (303) 4243782"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </div>

                  <div className="dropdown-container ">
                    <div
                      className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full dark:bg-gray-700 dark:text-white"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedCourse ? selectedCourse.course_name : 'Select a course'}
                    </div>

                    {isDropdownOpen && (
                      <div className="dropdown-menu">
                        <input
                          type="text"
                          placeholder="Search courses"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="mb-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full dark:bg-gray-700 dark:text-white"
                        />
                        <ul className="list-none max-h-60 overflow-y-auto cursor-pointer">
                          {filteredCourses.map(course => (
                            <li
                              key={course.id}
                              className="dropdown-item dropdown-item hover:bg-gray-100 hover:text-indigo-600  dark:text-black"
                              onClick={() => handleCourseSelect(course)}
                            >
                              {course.course_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>


                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Tell us a little about the project..."
                      value={comment} // Use only the value prop
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div></div>
                </form>

                <div className="flex justify-center mt-5">
                  <button
                    className="bg-blue-500 w-full py-[12px] px-[20px] rounded-lg text-white"
                    onClick={SubmitData}
                    disabled={isSubmitting} // Disable the button when submitting
                  >
                    {isSubmitting ? "Processing..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 px-4 lg:px-20 bg-gray-50">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
            Find More Branches in Pakistan
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactus.map((branch) => (
              <div key={branch.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image src={branch.image} alt={`Image of ${branch.title}`} width={500} height={50} className="w-full h-56 object-cover object-center" />
                <div className="p-4">
                  <h2 className="font-semibold text-xl text-gray-800">{branch.title}</h2>
                  <p className="text-gray-600 mt-2">{branch.description}</p>
                  <div className="mt-4">
                    <a href={`tel:${branch.phone}`} className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">Phone: {branch.phone}</a>
                    {branch.phone1 && (
                      <a href={`tel:${branch.phone1}`} className="block text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">Phone: {branch.phone1}</a>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <a href={branch.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit Us</a>
                    <a href={branch.Map} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Map</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Toaster />
      </motion.div>
    </>
  );
};

export default Contactus;
