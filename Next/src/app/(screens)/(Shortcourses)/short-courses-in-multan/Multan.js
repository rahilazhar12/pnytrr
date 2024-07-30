'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse, { domToReact } from 'html-react-parser';
import gif from '../../../assets/image/gif.gif';
import Image from 'next/image';

const Multan = () => {
    const [courses, setCourses] = useState({ description: '', post_image: '' });
    const [meta, setMeta] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://www.admin777.pny-trainings.com/api/shortcourse/short-courses-in-multan`);
                setCourses(response.data.courses[0]);
                setMeta(response.data.meta);
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

    const parsedDescription = courses.description ? parse(courses.description, {
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
    }) : null;

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
                <div className='text-[48px] max-sm:text-[24px] font-semibold'>Multan</div>
                <div className='text-[20px] max-sm:text-[24px] font-semibold'>Short Courses</div>
            </section>
            <div className='w-full px-32 py-2'>
                <img className='w-full' src={courses.post_image_thumb} alt="" />
            </div>

            {parsedDescription}
        </>
    )
}

export default Multan;
