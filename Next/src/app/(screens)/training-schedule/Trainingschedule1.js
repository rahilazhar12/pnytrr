"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import gif from '../../assets/image/gif.gif'
import Link from 'next/link'
import gif from '../../assets/image/gif.gif';
import Image from 'next/image';
const Trainingschedule1 = () => {
  const parentTabContentSelector = "data-tabs-target"

  const [batches, setBatches] = useState({});
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Add this line
  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setMetaData] = useState({ title: '', description: '' });

  useEffect(() => {
    // Assuming you're fetching the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.admin777.pny-trainings.com/api/metas/training-schedule');
        if (response.data && response.data.metas.length > 0) {
          const { meta_title, meta_description } = response.data.metas[0];
          setMetaData({ title: meta_title, description: meta_description });
        }
      } catch (error) {
        console.error('There was an error fetching the meta data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render


  // _______________________________________________________________________________________




  useEffect(() => {
    setIsLoading(true);  // Set loading state to true when the effect starts

    axios.get('https://lms.pnytraining.com/api/trainingSchedules?type=month&duration=2')
      .then(response => {
        setBatches(response.data.Batches);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);  // Set loading state to false when the request is complete, regardless of success or failure
      });

  }, []);


  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedDivision(null); // Reset division selection when a new city is selected
  };

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
  };

  const getDivisions = (cityBatches) => {
    const divisions = new Set();
    cityBatches.forEach(batch => {
      if (batch.branch && batch.branch.DivisionName) {
        divisions.add(batch.branch.DivisionName);
      }
    });
    return Array.from(divisions);
  };

  const formatSessionTimings = (days) => {
    // Check if 'days' is an array and has elements
    if (Array.isArray(days) && days.length > 0) {
      // Map each day to a formatted string and join them with a comma
      return days.map(day => `${day.day}: ${day.start_time} - ${day.end_time}`).join(', ');
    } else {
      // Return a default message if 'days' is not an array or is empty
      return 'No schedule available';
    }
  };

  const calculateDurationInMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const yearsDifference = end.getFullYear() - start.getFullYear();
    const monthsDifference = end.getMonth() - start.getMonth();
    const totalMonths = (yearsDifference * 12) + monthsDifference;

    return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };


  const filterCourses = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase(); // Ensure case-insensitive and trim white spaces

    if (!trimmedQuery) return batches; // If search query is empty, return all batches

    const filteredBatches = {};
    Object.keys(batches).forEach(city => {
      // Filter batches for each city
      filteredBatches[city] = batches[city].filter(batch => {
        const courseNameLower = batch.courseName.toLowerCase();
        return courseNameLower.includes(trimmedQuery);
      });
    });

    return filteredBatches;
  };



  const displayedBatches = filterCourses();


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
    <div>
      <header className="text-gray-600 body-font bg-gray-50">
        <div className="container mx-auto flex flex-wrap py-2 flex-col md:flex-row items-center">
          <Link href="#" className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0">
            <span className="ml-3 text-sm text-gray-800">Home</span>
            <svg class="w-2 h-2 text-gray-800 dark:text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
            </svg>
            <span className="ml-3 text-sm text-red-500">Trainings</span>
          </Link>
        </div>
      </header>
      <section class="">
        <div className="grid lg:grid-cols-4 p-10">
          <div className='col-span-2 text-[32px] font-semibold'>Training Schedule</div>
          <div className=' col-span-2 flex justify-end gap-5'>
            <div>
              <Link href="https://lms.pnytraining.com/" target="_blank">

                <button className='px-[16px] py-[10px] max-sm:w-full border rounded-xl text-[14px] text-[#308AFF] font-medium border-[#308AFF]'>Enrol Now (Limited seats left)</button>
              </Link>
            </div>
            <div>
              <Link href='/pny-training-fee-structure'>
                <button className='px-[16px] py-[10px] max-sm:w-full rounded-xl bg-blue-500 text-white'>Fee Structure</button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <div className='container px-10'>
        <div data-tabs-toggle={parentTabContentSelector}>
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">


              {/* <h2>Select a City</h2> */}
              <div>
                {Object.keys(displayedBatches).map(city => (
                  <button key={city} onClick={() => handleCityClick(city)}>
                    <li role="presentation">
                      <button className={`inline-block p-2 border-b-2 rounded-t-lg ${selectedCity === city ? 'border-blue-500 text-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 '}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected={selectedCity === city}>
                        {city}
                      </button>
                    </li>
                  </button>
                ))}
              </div>



            </ul>
          </div>


          <div id="myTabContent">
            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">




            </div>



          </div>
        </div>
      </div>

      <header className="text-gray-600 body-font px-10">
        <div className="container mx-auto flex flex-col md:flex-row">
          <nav className="flex flex-wrap items-center text-base md:ml-auto me-auto w-full">
            {selectedCity && batches[selectedCity] && (
              <>
                {/* <h3>{selectedCity}</h3> */}
                {/* <h4>Select a Division</h4> */}

                {selectedCity && batches[selectedCity] && (
                  <div>
                    {getDivisions(batches[selectedCity]).map(division => (
                      <button key={division} onClick={() => handleDivisionClick(division)}>
                        <button type="button" className={`hover:text-white dark:text-white from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2 text-center mr-2 mb-2 ${selectedDivision === division ? 'bg-[#308AFF] text-white' : 'bg-transparent border border-blue-700 hover:bg-blue-500'}`}>
                          {division}
                        </button>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}





            <span>
              <div className="mb-3 mt-2 w-[500px] max-sm:w-auto">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    className="relative m-0 -mr-0.5 block w-full flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                    onChange={handleSearchChange} // Add this line
                  />
                </div>
              </div>
            </span>

          </nav>

        </div>
      </header>


      <div class="container mx-auto overflow-x-auto px-5 mt-5">
        <table class="min-w-full bg-white shadow overflow-hidden rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Session Timings
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {selectedCity && displayedBatches[selectedCity] && displayedBatches[selectedCity].filter(batch => (!selectedDivision || (batch.branch && batch.branch.DivisionName === selectedDivision))).map(batch => (
              <tr key={batch.id} class="hover:bg-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {batch.courseName}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {batch.start_date}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {formatSessionTimings(batch.days)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {calculateDurationInMonths(batch.start_date, batch.end_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </div>
  )
}

export default Trainingschedule1