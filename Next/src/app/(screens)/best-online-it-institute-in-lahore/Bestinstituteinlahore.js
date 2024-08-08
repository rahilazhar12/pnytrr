'use client'

import React, { useEffect, useState } from 'react';
import gif from '../../assets/image/gif.gif';
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";

const BestInstituteInLahore = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.admin777.pny-trainings.com/api/pages/best-online-it-institute-in-lahore')
            .then(response => response.json())
            .then(data => {
                setPageData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

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


    if (!pageData) return <div>Error loading data.</div>;

    const { page } = pageData;

    const parsedDescription = parse(page.page_description, {
        replace: (domNode) => {
            if (domNode.type === "tag") {
                // Add custom classes to specific HTML tags
                if (domNode.name === "p") {
                    const props = { className: "p-5" };
                    return <p {...props}>{domToReact(domNode.children)}</p>;
                }
                if (domNode.name === "h3") {
                    const props = { className: "p-5 text-lg" };
                    return <h3 {...props}>{domToReact(domNode.children)}</h3>;
                }
                if (domNode.name === "h2") {
                    const props = { className: "p-5 text-lg" };
                    return <h2 {...props}>{domToReact(domNode.children)}</h2>;
                }
                if (domNode.name === "ul") {
                    const props = { className: "p-5" };
                    return <ul {...props}>{domToReact(domNode.children)}</ul>;
                }
            }
        },
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center my-4">{page.page_title}</h1>
            <img src={page.page_image} alt="Page" className="w-full h-auto rounded-lg shadow-md my-4" />
            <div className="prose prose-lg">
                {parsedDescription}
            </div>
        </div>
    );
}

export default BestInstituteInLahore;
