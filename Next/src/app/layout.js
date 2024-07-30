"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const blockedUrls = [
      '/blog/short-courses-in-faisalabad',
      // Add more URLs you want to block
    ];

    if (blockedUrls.includes(pathname)) {
      router.replace('/404'); // or any custom 404 page path
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Whatsapp />
        <Footer />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "PNY Trainings",
              url: "https://www.pnytrainings.com/",
              logo:
                "https://www.pnytrainings.com/assets/uploads//logo/1529168423-school-logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "03041111774",
                contactType: "customer service",
                contactOption: "HearingImpairedSupported",
                areaServed: "PK",
                availableLanguage: "en",
              },
              sameAs: [
                "https://www.facebook.com/PNY.Trainings/",
                "https://www.instagram.com/pny.trainings/",
                "https://www.youtube.com/c/PNYTrainingsOfficial",
                "https://pk.linkedin.com/company/pny-trainings",
              ],
            }),
          }}
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JWSHEGQWHD"></Script>
        <Script id="gtag-init">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JWSHEGQWHD');
        `}
        </Script>
      </body>
    </html>
  );
}
