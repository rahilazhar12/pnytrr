'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PNYlogo from "../../assets/image/PNY Trainings logo.png";
import Image from "next/image";

const Searchbar = () => {
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getIcon = (index) => {
    switch (index % 16) {
      // Your icon logic here
      default:
        return null;
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleItemClick = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch("https://www.admin777.pny-trainings.com/api/menu")
      .then((response) => response.json())
      .then((data) => {
        setData(data.categories_menu);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length > 2) {
      setLoading(true);
      fetch(
        `https://www.admin777.pny-trainings.com/api/search/${encodeURIComponent(
          query.trim()
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setResults(Array.isArray(data.search_result) ? data.search_result : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setResults([]);
          setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="relative flex flex-col lg:flex-row items-center mb-2 lg:mb-0 space-y-2 md:space-y-0">
          <Link href="/">
            <Image src={PNYlogo} alt="PNY Logo" className="w-20" />
          </Link>
          <section className="w-full" ref={dropdownRef}>
            <div className="group inline-block w-full text-center">
              <button
                className="outline-none focus:outline-none border px-3 py-5 bg-blue-400 text-white h-[36px] rounded-lg flex items-center justify-center w-52 mx-auto"
                onClick={toggleDropdown}
              >
                <span className="pr-1 font-semibold flex-1">Categories</span>
                <span>{/* Your SVG icon here */}</span>
              </button>
              {dropdownOpen && (
                <ul className="bg-white border z-10 border-gray-200 rounded-lg shadow-lg absolute transition duration-200 ease-in-out sm:mx-auto sm:left-1/2 sm:right-1/2 sm:top-full sm:translate-x-[-40%] sm:min-w-full sm:mt-0">
                  {data.map((item, index) => (
                    <li
                      className="rounded-lg relative px-4 py-2 hover:bg-blue-50 flex items-center"
                      key={item.url_slug}
                      onClick={handleItemClick}
                    >
                      {getIcon(index)}
                      <Link
                        href={
                          item.url_slug ===
                            "google-scholarship-certification-in-lahore-pakistan" ||
                            item.url_slug === "fast-track-pro-bootcamps"
                            ? `/${item.url_slug}`
                            : `/courses/${item.url_slug}`
                        }
                        className="w-full text-left ml-4 flex items-center outline-none focus:outline-none text-gray-800 hover:text-blue-600"
                      >
                        <span className="pr-2 flex-1 text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        <div className="flex-1 mb-4 lg:mb-0 mx-2">
          <input
            type="search"
            placeholder="Search for the software or skills you want to learn"
            className="w-full p-2 border rounded-md md:max-w-md lg:max-w-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <ul className="results-scrollbar absolute w-60 md:w-[505px] lg:w-[450px] xl:w-[510px] mt-1 max-h-96 overflow-y-auto bg-white">
            {loading ? (
              <li className="text-center py-3">Searching...</li>
            ) : results.length > 0 ? (
              results.map((result) => (
                <li
                  key={result.id}
                  className="border-b border-gray-200 px-5 py-3 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  <Link
                    href={`/${result.url_slug}`}
                    className="text-blue-600 z-auto hover:text-blue-800"
                  >
                    {result.name}
                  </Link>
                </li>
              ))
            ) : (
              !loading &&
              query.trim().length > 2 && (
                <li className="text-center py-3">No results found.</li>
              )
            )}
          </ul>
        </div>

        <div className="flex space-x-3">
          <Link href="/" className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 font-semibold">
            Home
          </Link>
          <Link href="/about-us" className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 font-semibold">
            About
          </Link>
          <Link href="/blog/" className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 font-semibold">
            Blog
          </Link>
          <Link href="/contact-us" className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 font-semibold">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
