"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
//  import Flyercomp from "../Flyers/Flyercomponent";
//  import Flyermodal from "../Flyers/Flyermodal";
//  import gif from "../../assets/image/gif.gif";
import gif from '../../assets/image/gif.gif';
import FlyerModal from "./Flyermodal";
import Flyercomponent from "./Flyercomponent";
import Image from "next/image";
const Flyers = () => {
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for tracking selected category
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [loading, setLoading] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://www.admin777.pny-trainings.com/api/flyers"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // const handleCategoryClick = (category) => {
  //     setSelectedCategory(category); // Update the selected category
  // };

  const handleFlyerClick = (flyer) => {
    const flyerData = data.flyers[flyer]; // Assuming 'flyer' is the key in your data structure
    setSelectedFlyer(flyerData);
    setModalOpen(true);
  };

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
      <section>

      </section>
      <section className="lg:h-[254px] bg-[#152438;] text-white flex flex-col justify-center items-center max-sm:p-5 ">
        <div className="max-sm:text-[24px] font-semibold riseUp 1s ease-out forwards space-y-3">

          <div class="text-container">
            <h1 class="outline-text-white-flyers">
              E-Flyers
            </h1>
          </div>

          <h4 className="text-center text-xl"></h4>
        </div>
        {/* <div className='text-[20px] font-normal max-sm:text-[16px] max-sm:text-center'>Learn more about the company and the team behind it.</div> */}
      </section>

      <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-3 p-3">
        {data.flyers &&
          Object.keys(data.flyers).slice(0, 12).map((flyerKey, index) => {
            const flyer = data.flyers[flyerKey];
            // Check if 'obj' exists and is an array, otherwise fallback to an empty array
            const flyerName = flyer.name; // Get the name of the flyer
            const flyerThumb = flyer.flyer_thumb; // New line: Extract flyer thumbnail

            return (
              <div key={index}>
                <h3
                  onClick={() => handleFlyerClick(flyerKey)}
                  style={{ cursor: "pointer" }}
                >
                  <Flyercomponent courses={flyerName} flyerThumb={flyerThumb} />
                </h3>
                {selectedCategory === flyerKey.name && (
                  <div>
                    {flyer.obj?.map((course, courseIndex) => (
                      <div key={courseIndex}>
                        <p>{course.class_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        {selectedFlyer && (
          <FlyerModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            flyerData={selectedFlyer.obj} // Pass the flyer data to the modal
            selectedFlyer={selectedFlyer}
          />
        )}
      </div>
    </>
  );
};

export default Flyers;
