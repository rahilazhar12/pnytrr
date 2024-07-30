'use client'
import React, { useEffect } from 'react';

const TawkToChatbot = () => {
    useEffect(() => {
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5ac33b2bd7591465c709239e/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    }, []);

    return null;
};

export default TawkToChatbot;
