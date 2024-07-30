'use client'

import React, { useState, useEffect, useRef } from "react";
import parse, { domToReact } from "html-react-parser";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaBriefcase,
  FaUserGraduate,
  FaUsers,
  FaVideo,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCity,
} from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { IconContext } from "react-icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import vector from "../../assets/images/vecter.png";
import gif from "../../assets/image/gif.gif";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: "90%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

import { motion } from "framer-motion";

let modulesData = [];

const Coursedetail = ({ params }) => {
  const courseSlug = params.slug;
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(modulesData[0]?.id);
  const [modules, setModules] = useState([]);
  const [id_address, setId_address] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setId_address(data.ip))
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []);

  useEffect(() => {
    // Function to fetch course data
    const fetchCourses = async () => {
      try {
        // Replace this URL with the actual URL of the API if you're fetching from a live API
        const response = await fetch(
          "https://www.admin777.pny-trainings.com/api/course/list"
        );
        const data = await response.json();
        setCourses(data.course_list);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();

  }, []);

  const brochureLinkRef = useRef(null);



  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.admin777.pny-trainings.com/api/course/${courseSlug}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourseData(data.course);
          setInstructor(data.course_instructor);
        } else {
          console.error(`Failed to fetch course data for slug: ${courseSlug}`);
        }
      } catch (error) {
        console.error(
          `Error fetching course data for slug: ${courseSlug}:`,
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();

  }, [courseSlug]);

  useEffect(() => {
    // Only fetch the data if courseData is not null
    if (courseData) {
      const fetchData = async () => {
        const response = await fetch(
          `https://www.admin777.pny-trainings.com/api/course/modules/${courseData.id}`
        );
        const data = await response.json();
        setModules(data.course_modules);
        // Set the selectedModuleId to the ID of the first module
        if (data.course_modules.length > 0) {
          setSelectedModuleId(data.course_modules[0].id);
        }
      };

      fetchData();
    }
  }, [courseData]); // Depend on courseData

  const handleModuleClick = (moduleId) => {
    setSelectedModuleId(moduleId);
  };

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

  const parsedDescription = courseData ? parse(courseData.description, {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        // For example, add a class to all <p> elements
        if (domNode.name === "p") {
          const props = { className: "p-5" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === "h3") {
          const props = { className: "p-5 text-lg" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === "ul") {
          const props = { className: "p-5" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === "h2") {
          const props = { className: "p-5" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
       
      }
    },
  }) : null;

  function SubmitData(e) {
    e.preventDefault();
    setLoading(true); // Start loading
    var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    // var id_address = "127.0.0.1"

    // Create a new FormData object
    var formData = new FormData();

    // Append the data to the FormData object
    formData.append("name", name);
    formData.append("city", city);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("id_address", id_address);
    formData.append("course_id", courseData.id);
    // formData.append('comment', comment);

    // Use fetch to send the request
    fetch("https://www.admin777.pny-trainings.com/api/brochure", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // toast.success(data.message, {
        //   duration: 5000
        // })
        // setOpen(false)
        setLoading(false);
        alert(data.message);
        brochureLinkRef.current.click();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // Stop loading on failure
      });
  }

  console.log(courseData?.meta_description, 'checkseo')

  return (
    <>


      <div>
        <div className="bg-gray-800 text-white p-6 min-h-auto">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              {/* Text section */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  {courseData ? courseData.name : null}
                </h2>
                <p className="mb-4">
                  {courseData ? courseData.description_short : null}
                </p>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <div className="mb-2 md:mb-0 md:mr-4">
                    <span className="font-bold">Course Fee:</span> Rs{" "}
                    {courseData?.monthly_tution_fee}
                  </div>
                  <div className="mb-2 md:mb-0 md:mr-4">
                    <span className="font-bold">Skill Level:</span>{" "}
                    {courseData?.skill_level}
                  </div>
                  <div className="mb-2 md:mb-0">
                    <span className="font-bold">Duration:</span>{" "}
                    {courseData?.duration} Months
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold">View Schedule</span>
                  <span className="mx-2">|</span>
                  <span>
                    <Link href="/training-schedule">Click here</Link>
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 max-sm:justify-center">
                  <div>
                    <button
                      className="bg-[#152438] border border-white text-white font-bold py-2 px-4 rounded"
                      onClick={handleOpen}
                    >
                      Download Course Brochure
                    </button>

                    <Link
                      ref={brochureLinkRef}
                      href={courseData?.brochure}
                      target="_blank"
                      style={{ display: "none" }}
                    >
                      Download Brochure Link
                    </Link>
                    <div>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="outline-none"
                          >
                            <div className="p-5 bg-white rounded-lg shadow-xl md:max-w-xl md:mx-auto border border-black">
                              <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                                <IoMdDownload className="inline-block mb-1" />{" "}
                                Download the Brochure
                              </h2>
                              <p className="text-sm text-center text-gray-600 mb-5">
                                Fill out the form to receive your brochure.
                              </p>
                              <form className="space-y-5" onSubmit={SubmitData}>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                  <FaUser className="p-2 text-3xl text-gray-500" />
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                                    required
                                  />
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                  <FaPhone className="p-2 text-3xl text-gray-500" />
                                  <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                                    required
                                  />
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                  <FaEnvelope className="p-2 text-3xl text-gray-500" />
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                                    required
                                  />
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                  <FaCity className="p-2 text-3xl text-gray-500" />
                                  <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                                    required
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
                                  disabled={loading}
                                >
                                  {loading ? (
                                    <div className="loadersmall"></div>
                                  ) : (
                                    "Submit"
                                  )}
                                </button>
                              </form>
                            </div>
                          </motion.div>
                        </Box>
                      </Modal>
                    </div>
                  </div>

                  <Link
                    href="https://lms.pnytraining.com"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>

              {/* Video section */}
              <div className="w-full md:w-1/2 flex  justify-center items-center bg-gray-700 p-2 max-sm:mt-2">
                {/* Responsive iframe container */}
                <div className="w-full aspect-w-16 aspect-h-9">
                  {/* Iframe YouTube */}
                  <iframe
                    className="w-full h-[300px] max-sm:h-[150px]"
                    src={`https://www.youtube.com/embed/${courseData?.video}`}
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col text-center lg:text-left lg:w-2/3 mx-auto mb-5 mt-5 justify-center">
            <h1 className="text-4xl  font-extrabold text-gray-900 dark:text-white mb-4 text-center">
              Course Module
            </h1>
            <p className="leading-relaxed  text-gray-900 dark:text-white text-center">
              Our course modules offer a well-rounded curriculum, combining
              theoretical foundations with hands-on training, ensuring students
              acquire industry-relevant skills and knowledge for future
              endeavors.
            </p>
          </div>
        </div>


        <section className="hidden sm:block p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
          <div className="grid grid-cols-1 md:grid-cols-4 border rounded-lg w-full mx-auto shadow-lg lg:h-[450px] md:h-[450px] ">
            {/* Module List */}
            <div className="border md:w-[172px] w-full overflow-y-auto">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`h-auto md:h-[113px] flex border border-black/25 shadow-lg justify-center items-center ${selectedModuleId === module.id
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                    }`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  {module.title}{" "}
                  <span className="ml-3">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              ))}
            </div>

            {/* Module Details */}
            <div className="col-span-3 md:col-span-3 overflow-y-auto ">
              <div className="text-lg dark:text-white md:text-2xl lg:text-3xl xl:text-3xl font-bold text-black mb-5 p-4">
                Key Features of this Course
              </div>
              <div className="space-y-2">
                {modules
                  .filter((module) => module.id === selectedModuleId)
                  .map((module) =>
                    parse(module.key_features, {
                      replace: (domNode) => {
                        if (domNode.type === "tag") {
                          if (domNode.name === "ul") {
                            const props = {
                              className:
                                "list-disc dark:text-white p-4 flex flex-col space-y-3",
                            };
                            return (
                              <p {...props}>{domToReact(domNode.children)}</p>
                            );
                          }
                        }
                      },
                    })
                  )}
              </div>
            </div>
          </div>
        </section>

        

        <section className="p-4 sm:hidden">
          <div className="flex flex-col border rounded-lg w-full mx-auto shadow-lg">
            {modules.map((module, index) => (
              <div key={module.id}>
                {/* Module Item */}
                <div
                  className={`flex flex-col border border-black/25 shadow-lg justify-center items-center p-2 cursor-pointer ${selectedModuleId === module.id
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                    }`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  {module.title}
                </div>

                {/* Accordion Content for Module Details */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedModuleId === module.id
                    ? "max-h-screen py-4"
                    : "max-h-0"
                    }`}
                >
                  {selectedModuleId === module.id && (
                    <div className="px-4">
                      <div className="text-lg font-bold text-black mb-2">
                        Key Features of {module.title}
                      </div>
                      {parse(module.key_features, {
                        replace: (domNode) => {
                          if (domNode.type === "tag") {
                            if (domNode.name === "ul") {
                              const props = { className: "list-disc" };
                              return (
                                <ul {...props}>
                                  {domToReact(domNode.children)}
                                </ul>
                              );
                            }
                          }
                        },
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
         


         {/* This section is okay */}
        <section>
          <div className="bg-blue-50 py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center text-black mb-6">
                Access Complementry Benefits by Enrolling in this Course.
              </h2>
              <p className="text-center text-black w-auto max-sm:w-auto mx-auto mb-10">
                We discover your personal and professional growth capitalize on
                opportunities through which you will get profound impact on
                various employment and career advancement.
              </p>
              <IconContext.Provider
                value={{ size: "2em", className: "text-blue-600" }}
              >
                <div className="grid grid-cols-6 gap-4 text-center max-sm:grid-cols-1">
                  <div className="flex flex-col items-center">
                    <FaBookOpen />
                    <p className="text-sm text-black font-semibold mt-2">
                      Learning Management System Access
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaChalkboardTeacher />
                    <p className="text-sm text-black font-semibold mt-2">
                      Instructor Support
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaBriefcase />
                    <p className="text-sm text-black font-semibold mt-2">
                      Internship Opportunity
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaUserGraduate />
                    <p className="text-sm text-black font-semibold mt-2">
                      Job Cell
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaUsers />
                    <p className="text-sm text-black font-semibold mt-2">
                      PNY Community Member
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaVideo />
                    <p className="text-sm text-black font-semibold mt-2">
                      Free Seminar Access
                    </p>
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </section>
        {/* _____ */}


          {/* okay */}
        <section>
          <div className="bg-white p-6">
            <div className="border-b border-gray-200 mb-4">
              <h3 className="text-lg font-semibold dark:text-black">OVERVIEW</h3>
            </div>
            {/* Check if instructor exists, else show "No data" */}
            {instructor ? (
              <div className="flex gap-6">
                {/* Author Image & Name */}
                <div className="flex flex-col items-center max-sm:hidden">
                  <div className=" w-32 h-32 bg-blue-500 rounded-full flex  items-center justify-center">
                    {/* Centered Image */}
                    <img
                      className="rounded-full object-cover h-full w-full"
                      src={
                        instructor.photo
                          ? instructor.photo
                          : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold dark:text-black">Instructor</p>
                </div>

                {/* Description */}
                <div className="flex-grow">
                  <div className="flex  flex-col justify-center items-center 2xl:hidden lg:hidden md:hidden">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                      alt=""
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 max-sm:text-center dark:text-black">
                    {instructor.name}
                  </h4>
                  <p className="text-gray-700 text-justify max-sm:text-center dark:text-black">
                    {instructor.other_info}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-xl font-semibold">No data</p>
            )}
          </div>
        </section>


        <section className="h-auto  ">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Content Section */}
              <div className="md:col-span-2 bg-white p-10 shadow rounded max-h-[950px] relative">
                <div class="sticky bottom-0 flex justify-center">
                  <div class="animate-bounce"></div>
                </div>
                <div className="scroll-content overflow-y-auto max-h-[800px]">
                  <p className="text-gray-700">{parsedDescription}</p>
                </div>
              </div>

              {/* Sidebar Section */}
              <div className="max-w-sm mx-auto">
                <div className="bg-blue-800 text-white text-xl font-semibold p-4">
                  COURSES WE OFFER
                </div>
                <div className="divide-y divide-gray-200">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 bg-[#EEFFFB] hover:bg-blue-200 cursor-pointer"
                    >
                      <Link href={`/${course.url_slug}`}>
                        <span className="dark:text-black"> {course.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section-13 */}
        <section
          className="bg-blue-100"
          style={{
            backgroundImage: `url(${vector})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid justify-center lg:p-28 md:p-20 max-sm:p-5 ">
            <div className="lg:text-5xl lg:w-[778px]  max-sm:p- font-bold text-center dark:text-black">
              Admissions are open for the fresh batch. Let’s grow together!
            </div>
            <div className="text-center lg:p-4 max-sm:mt-2">
              <Link href="https://lms.pnytraining.com/">
                {" "}
                <button className="bg-[#49B2DF] lg:w-48 lg:h-14 text-white rounded max-sm:w-36 max-sm:h-10 dark:text-white">
                  Enroll Now!
                </button>{" "}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Coursedetail;
