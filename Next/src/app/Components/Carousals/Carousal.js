'use client'

import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import c1 from "../../assets/Collaboration/1.png";
import c2 from "../../assets/Collaboration/2.png";
import c3 from "../../assets/Collaboration/3.png";
import c4 from "../../assets/Collaboration/4.png";
import c5 from "../../assets/Collaboration/5.png";
import c6 from "../../assets/Collaboration/6.png";
import c7 from "../../assets/Collaboration/7.png";
import g1 from "../../assets/image/g1.png";
import g2 from "../../assets/image/g2.png";

export const Homecarousal = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchcarousalimage = async () => {
      try {
        let response = await fetch("https://www.admin777.pny-trainings.com/api/slider");
        const data = await response.json();
        setData(data.sliders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcarousalimage();
  }, []);




  return (
    <div>
      <Carousel className="h-56 w-full max-sm:h-20 md:h-96 -z-50">
        {data.map((slider) => (
          <div key={slider.id} className="w-full h-full">
            <img
              className="w-full h-auto sm:h-64 md:h-96"
              src={slider.image}
              alt={slider.title}
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};


export const Carousalcollaboration = () => {
  return (
    <div>
      <Carousel className="max-sm:h-36  lg:h-80   md:h-56 ">
        <Image alt="..." src={c2} loading="lazy" />
        <Image alt="..." src={c1} loading="lazy" />
        <Image alt="..." src={c3} loading="lazy" />
        <Image alt="..." src={c4} loading="lazy" />
        <Image alt="..." src={c5} loading="lazy" />
        <Image alt="..." src={c6} loading="lazy" />
        <Image alt="..." src={c7} loading="lazy" />
      </Carousel>
    </div>
  );
};


export const CarousalEmpower = () => {
  return (
    <div>
      <Carousel className="max-sm:h-20  lg:h-32  md:h-20  ">
        <Image alt="..." src={g1} loading="lazy" />
        <Image alt="..." src={g2} loading="lazy" />
      </Carousel>
    </div>
  );
};
