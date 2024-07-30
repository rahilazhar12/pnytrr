import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CityList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://www.admin777.pny-trainings.com/api/city/all');
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();

  }, []);

  return (
    <div className="md:col-span-1 lg:col-span-1 p-4 bg-green-100 h-[500px] max-sm:h-auto rounded-lg max-sm:mb-2">
      <h3 className="font-bold text-lg mb-2 bg-blue-900 text-white p-2 rounded">
        COURSES WE OFFER IN CITIES
      </h3>
      <ul className="space-y-3">
        {cities.map((city) => (
          <li key={city.id} className="hover:bg-green-200">
            <Link href={`/city/${city.url_slug}`} className="block p-2 mt-3 -m-2">
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
