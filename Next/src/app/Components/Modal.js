// Modal.js

import React from 'react';
import { motion } from 'framer-motion';
import { IoMdDownload } from 'react-icons/io';
import { FaUser, FaPhone, FaEnvelope, FaCity } from 'react-icons/fa';

const Modal = ({ open, handleClose, SubmitData, loading }) => {
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-50"
            onClick={handleClose}
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center min-h-screen px-4 py-8"
          >
            <div className="relative w-full max-w-lg p-8 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <span className="sr-only">Close</span>
                  &#x2715;
                </button>
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                <IoMdDownload className="inline-block mb-1" /> Download the
                Brochure
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
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Modal;
