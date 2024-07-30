"use client"
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const FlyerModal = ({ open, handleClose, flyerData, selectedFlyer }) => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      // setWindowWidth(window.innerWidth);
    };

    // window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: windowWidth < 768 ? "90%" : 500,
    maxHeight: "80vh", // Set a maximum height for the modal content
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto", // Enables vertical scrolling if content overflows
  };

  const modalClass = `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  w-11/12 md:w-2/3 lg:w-1/2 
  max-h-[90vh] overflow-y-auto 
  bg-white rounded-lg shadow-2xl 
  border border-gray-100 
  p-6`;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
  <div className={modalClass}>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md p-4 text-center text-white font-semibold shadow">
      {selectedFlyer ? selectedFlyer.name : "Explore Our Courses"}
    </div>

    <div className="mt-6">
      {flyerData && flyerData.map((course, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{course.class_name}</h3>
            <a href={course.brochure_download} target="_blank" className="text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out" rel="noopener noreferrer">
              Download Brochure
            </a>
          </div>
          <p className="mt-2 text-sm text-gray-600">{course.description || "No description available."}</p>
        </div>
      ))}
    </div>
  </div>
</Fade>

      </Modal>
    </div>
  );
};

export default FlyerModal;
