'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import parse, { domToReact } from 'html-react-parser';
import gif from '../../../assets/image/gif.gif'
import Image from 'next/image';

const Faislabad1 = () => {
    const [courses, setCourses] = useState({ page_description: '' });
    const [meta, setMeta] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://www.admin777.pny-trainings.com/api/shortcourse/short-courses-in-faisalabad`);
                setCourses(response.data.course);
                setMeta(response.data.metas);


            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();

    }, []);

    const commonStyles = 'py-2 px-32 max-sm:p-2';
    const textStyle = `${commonStyles} text-justify`;
    const titleStyle = `${commonStyles} text-lg`;

    const parsedDescription = parse(courses.page_description, {
        replace: domNode => {
            if (domNode.type !== 'tag') return;

            const props = { className: '' };
            switch (domNode.name) {
                case 'p':
                    props.className = textStyle;
                    return <p {...props}>{domToReact(domNode.children)}</p>;

                case 'h1':
                    props.className = `${titleStyle} text-2xl`;
                    return <h1 {...props}>{domToReact(domNode.children)}</h1>;

                case 'h2':
                    props.className = `${titleStyle} text-xl`;
                    return <h2 {...props}>{domToReact(domNode.children)}</h2>;

                case 'h3':
                    props.className = titleStyle;
                    return <h3 {...props}>{domToReact(domNode.children)}</h3>;
                case 'b':
                    props.className = titleStyle;
                    return <h3 {...props}>{domToReact(domNode.children)}</h3>;

                case 'ul':
                    props.className = commonStyles;
                    return <ul {...props}>{domToReact(domNode.children)}</ul>;

                case 'a':
                    props.className = 'text-blue-500 hover:text-red-500';
                    return <a {...props}>{domToReact(domNode.children)}</a>;

                // Add more cases for other tags as needed

                default:
                    return domToReact(domNode.children);
            }
        }
    });

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
                <div className='text-[48px] max-sm:text-[24px] font-semibold'>Faisalabad</div>
                <div className='text-[20px] max-sm:text-[24px] font-semibold'>Short Courses</div>
                {/* <div className='text-[20px] font-normal max-sm:text-[16px] max-sm:text-center'>Learn more about the company and the team behind it.</div> */}
            </section>
            <div className='w-full px-32 py-2'>
                <img className='w-full' src={courses.page_image} alt="" />
            </div>

            {courses.page_description && parsedDescription}
        </>
    )
}

export default Faislabad1
