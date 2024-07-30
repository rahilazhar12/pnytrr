'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import gif from "../../assets/image/gif.gif";
import Image from "next/image";
const AllCourses = () => {
    const [pro, setPro] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);

    const [loading, setLoading] = useState("");

    const detadata = async () => {
        let res = await fetch(
            "https://www.admin777.pny-trainings.com/api/get-courses"
        );
        setLoading(true);
        res = await res.json();
        setPro(res);
        setSelectedCourse(res); // Initialize selectedCourse with all courses
        setLoading(false);
    };

    useEffect(() => {
        detadata();
        window.scrollTo(0, 0);
    }, []);

    const handleCourseClick = (courseName) => {
        // If the "All" button is clicked, show all courses
        if (courseName === "All") {
            setSelectedCourse([...pro]);
        } else {
            // Filter the courses based on the selected course name
            const update = pro.filter((courseData) => {
                return courseData.name === courseName;
            });
            setSelectedCourse(update);
        }
    };

    // Create a button for "All" courses
    const allCoursesButton = (
        <span key="All" className="text-white">
            <div className="col-span-6 md:col-span-3">
                <button
                    onClick={() => handleCourseClick("All")}
                    type="button"
                    className={`text-white border border-gray-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2`}
                >
                    All
                </button>
            </div>
        </span>
    );

    let courseNames = pro.map((courseData) => courseData.name);

    if (loading) {
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
            <div>
                <section className="text-gray-400 body-font bg-[#152438]">
                    <div className="container px-5 py-16 mx-auto">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-center text-white">
                            Explore Skilled Courses
                        </h1>
                        <div className="flex flex-wrap justify-center space-x-4">
                            {allCoursesButton}
                            {courseNames.map((courseName) => (
                                <div key={courseName} className="mb-4">
                                    <button
                                        onClick={() => handleCourseClick(courseName)}
                                        type="button"
                                        className={`text-white border border-gray-300 hover:bg-blue-800 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                    >
                                        {courseName}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="text-gray-700 bg-gray-50 body-font">
                    <div className="container max-w-7xl px-5 py-10 mx-auto">
                        <div className="grid grid-cols-1 gap-8">
                            {selectedCourse.map((courseData) => (
                                <div key={courseData.id} className="container mx-auto">
                                    <h1 className="text-3xl font-bold text-gray-900 px-6 mb-6">
                                        {courseData.name}
                                    </h1>
                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                                        {courseData.obj &&
                                            courseData.obj.map((detail) => (
                                                <div key={detail.id} className="p-4">
                                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                                        <Link href={`/${detail.url_slug}`}>
                                                            <img
                                                                src={detail.course_image}
                                                                alt="Image 1"
                                                                className="w-full h-48 object-cover"
                                                            />
                                                        </Link>
                                                        <div className="p-6">
                                                            <h2 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {detail.name}
                                                            </h2>
                                                            <Link href={`/${detail.url_slug}`} className="text-indigo-500 inline-flex items-center mt-4">
                                                                More Details
                                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                <section className="lg:p-10">
                    <div className="grid justify-center">
                        <div className=" lgh lg:p-2  dark:text-white">Our Affiliations</div>
                        <div className="lgp max-sm:p-3 md:px-10 md:py-2 dark:text-white">
                            Our collaboration with esteemed partners has strengthened our
                            mission to empower youth through skills, making a lasting
                            impact on their lives.
                        </div>

                        <div className="imageaffiliation flex justify-center max-sm:p-2 md:py-5">
                            <img src="/images/Frame 624.png " alt="" />
                        </div>

                        <div className="flex justify-center p-5 gap-5 max-sm:hidden dark:text-white">
                            <div className=" border-b-2 border-black">
                                Navtech certifications
                            </div>
                            <div className=" border-b-2 border-black">
                                Google scholarship programm
                            </div>
                            <div className=" border-b-2 border-black">
                                Free learning courses
                            </div>
                            <div className=" border-b-2 border-black">Internship program</div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AllCourses;
