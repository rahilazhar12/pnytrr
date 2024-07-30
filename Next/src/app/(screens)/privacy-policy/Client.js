"use client"
import React, { useState, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";
import axios from "axios";
import Image from "next/image";
import gif from '../../assets/image/gif.gif';
const Client = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://www.admin777.pny-trainings.com/api/pages/privacy-policy"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
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
    replace: (domNode) => {
      if (domNode.type === "tag") {
        if (domNode.name === "p") {
          // Adding responsive padding and text alignment classes
          const props = { className: "px-4 sm:px-32 py-2 text-justify dark:text-white" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === "h3") {
          // Adjusting padding and font size for smaller screens
          const props = { className: "p-3 sm:p-5 text-base sm:text-lg dark:text-white" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === "ul") {
          // Adjusting padding for smaller screens
          const props = { className: "p-3 sm:p-5 dark:text-white" };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
      }
    },
  });

  return (
    <main>


      <section>
        <div className="bg-[#152438] text-white h-[206px] flex flex-col justify-center items-center">
          <div className="text-4xl sm:text-[48px] font-semibold">Privacy Policy</div>
        </div>
      </section>


      {parsedDescription}
    </main>
  );
};

export default Client;
