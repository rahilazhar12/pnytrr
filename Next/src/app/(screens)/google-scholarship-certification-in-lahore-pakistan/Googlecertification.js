"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse, { domToReact } from 'html-react-parser';
import gif from '../../assets/image/gif.gif';
import Image from 'next/image';
const GoogleCertification1 = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('https://www.admin777.pny-trainings.com/api/pages/google-scholarship-certification-in-lahore-pakistan');
        setData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data: ', error);
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


  const parsedDescription = parse(data.page.page_description, {
    replace: domNode => {
      if (domNode.type === 'tag') {
        // For example, add a class to all <p> elements
        if (domNode.name === 'p') {
          const props = { className: 'p-5' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'h3') {
          const props = { className: 'p-5 text-lg' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'ul') {
          const props = { className: 'p-5' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        // if (domNode.name === 'a') {
        //   const props = { className: 'bg-[#0c7ec2] text-white hover:bg-red-500 p-3 w-80 cursor-pointer rounded mx-auto'};
        //   return <p {...props}>{domToReact(domNode.children)}</p>;
        // }
      }
    }
  });

  return (
    <main>
      <div>


        <section>
          <div className='grid grid-cols-1'>
            <img className='w-full 2xl:w-full' src={data.page_banner} alt={data.page.page_title} />
          </div>
        </section>

        <section className='p-5'>
          <h1 className='text-xl p-5  font-semibold'>{data.page.page_title}</h1>
          {parsedDescription}
        </section>
      </div>
    </main>
  );
};

export default GoogleCertification1;
