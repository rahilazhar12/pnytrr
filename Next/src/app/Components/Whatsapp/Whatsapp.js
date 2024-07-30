'use client'
import React, { useState, useEffect } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";

const Whatsapp = () => {

  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // default background color
  const [iconColor, setIconColor] = useState('green');

  useEffect(() => {
    // Check if the background color is not white, and change the icon color accordingly
    if (backgroundColor !== '#FFFFFF') {
      setIconColor('white');
    } else {
      setIconColor('green');
    }
  }, [backgroundColor]);


  const navigateToWhatsApp = () => {
    // Replace with your WhatsApp link
    const whatsappUrl = 'https://wa.me/+923101111774';
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      onClick={navigateToWhatsApp}
      className="fixed bottom-0 right-0 m-4 cursor-pointer z-50"
    >
      < IoLogoWhatsapp size={60} color={iconColor} />
    </div>
  );
};

export default Whatsapp;
