'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import gif from '../assets/image/gif.gif';
import { Flowbite } from "flowbite-react";
import Image from "next/image";

const Blog = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.admin777.pny-trainings.com/api/featuredposts")
            .then((response) => response.json())
            .then((data) => {
                // Sort the data by publication date in descending order
                const sortedData = data.featured_posts.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
                setData(sortedData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const [filter, setFilter] = useState("All");

    const handlefilter = (filtercriteria) => {
        setFilter(filtercriteria);
    };

    const filterData = data.filter((item) => {
        return filter === "All" || item.title.includes(filter);
    });

    if (isLoading) {
        return (
            <div className="loader-wrapper">
                {/* Semi-transparent background */}
                <div className="loader-overlay"></div>
                {/* Loader */}
                <div className="loaderContainer">
                    {/* Use the gif as a loader */}
                    <Image className="w-52 h-52" src={gif} alt="Loading..." loading="lazy" />
                </div>
            </div>
        );
    }

    return (
        <Flowbite>
            <main className="bg-gray-100 dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl">
                {/* Section-2 */}
                <section className="bg-gray-800 lg:h-[500px] h-auto sm:h-96 max-sm:p-2">
                    <div className="main grid text-white justify-center">
                        <div className="blog text-3xl font-semibold px-6 mt-8 sm:text-5xl sm:px-20 sm:mt-20 text-center">
                            Blogs and insights
                        </div>
                        <div className=" text-[20px] text-center mt-3 sm:mt-6">
                            Get knowledge with the latest blog insights.
                        </div>
                    </div>

                    <div className="list text-white">
                        <ul className="flex flex-wrap justify-center mt-6 sm:mt-10">
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("All")}
                            >
                                All
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Technology")}
                            >
                                Technology
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Marketing")}
                            >
                                {" "}
                                Marketing
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Software")}
                            >
                                Software
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Education")}
                            >
                                Education
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Short Courses in Islamabad")}
                            >
                                Short Courses in Islamabad
                            </li>
                        </ul>
                        <ul className="flex flex-wrap justify-center mt-3 sm:mt-6">
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Short courses in Faisalabad")}
                            >
                                Short courses in Faisalabad
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("IT Softwares")}
                            >
                                IT Softwares
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("SEO")}
                            >
                                SEO
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Design")}
                            >
                                Design
                            </li>
                            <li
                                className="border border-gray-500 rounded-xl p-2 text-center mx-2 my-1 hover:bg-blue-600 cursor-pointer"
                                onClick={() => handlefilter("Photography")}
                            >
                                Photography
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section-3 */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 lg:p-20 ">
                    {filterData.length > 0 ? (
                        filterData.map((item, index) => (
                            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    className="rounded-t-lg w-full h-auto object-cover object-center"
                                    src={item.post_image_thumb}
                                    alt={item.title} // Using item.title for alt text for better accessibility.
                                    style={{ maxHeight: '240px' }} // Inline styles are fine, but consider using CSS classes.
                                    loading="lazy"
                                />
                                <div className="p-6">
                                    <h5
                                        className="text-2xl text-black font-bold tracking-tight mb-2 dark:text-black"
                                        data-aos="fade-up-right"
                                        data-aos-delay={`${index * 100}`}
                                    >
                                        {item.title}
                                    </h5>
                                    <p
                                        className="font-normal text-gray-700 mb-4 dark:text-black"
                                        data-aos="fade-up-right"
                                        data-aos-delay={`${index * 100 + 50}`}
                                    >
                                        {item.description_short}
                                    </p>
                                    <Link href={`/blog/${item.category_slug}/${item.url_slug}`} className="inline-block bg-[#3f83f8] text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-600 transition-colors">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xl font-semibold">No data found.</p>
                        </div>
                    )}
                </section>
            </main>
        </Flowbite>
    );
};

export default Blog;
