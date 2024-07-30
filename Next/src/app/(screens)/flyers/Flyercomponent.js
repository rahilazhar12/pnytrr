 "use client"
import Link from "next/link";
import React from "react";


const Flyercomponent = ({ courses, flyerThumb }) => {
  return (
    <>
      <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700">
        <div className="relative overflow-hidden">
          <img
            src={flyerThumb}
            alt="Flyer Thumbnail"
            className="w-full object-cover"
            loading="lazy"
          />
          <Link
            href=""
            className="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
          >
            <span className="sr-only">View flyer</span>
          </Link>
        </div>
        <div className="p-6">
          <h5 className="mb-4 text-2xl text-center font-semibold leading-snug text-neutral-800 dark:text-neutral-50">
            {courses}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Flyercomponent;
