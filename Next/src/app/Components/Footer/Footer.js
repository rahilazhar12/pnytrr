'use client'

import React, { useEffect, useState } from "react";
import arfatower from "../../assets/image/arfa tower.png";
import iqbaltown from "../../assets/image/iqbal town.png";
import johartown from "../../assets/image/Jahor town.png";
import multan from "../../assets/image/Multan.png";
import rawal from "../../assets/image/rawalpindi.png";
import shad from "../../assets/image/shad.webp";
import temp from "../../assets/image/pny logo dark.jpg.png"
import pnylogonew from "../../assets/image/PNY Trainings logo.png";
import pnylogodark from "../../assets/image/pny logo dark.jpg.png";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Flowbite } from "flowbite-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
    const navigate = useRouter()

    const [offeredCourses, setOfferedCourses] = useState([]);
    const [languageCourses, setLanguageCourses] = useState([]);
    const [showAllBranches, setShowAllBranches] = useState(false);

    // const toggleBranches = () => {
    //     setShowAllBranches(!showAllBranches);
    // };

    const redirectToCity = (cityName) => {
        navigate.push(`/city/${cityName}`);
    };

    useEffect(() => {
        const fetchOfferedCourses = async () => {
            try {
                let response = await fetch(
                    "https://www.admin777.pny-trainings.com/api/footer/offeredcourses"
                );
                let data = await response.json();
                // Assuming the data is directly in the format you provided
                setOfferedCourses(data.courses_links);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOfferedCourses();
    }, []);

    useEffect(() => {
        const fetchLanguageCourses = async () => {
            try {
                let response = await fetch(
                    "https://www.admin777.pny-trainings.com/api/footer/languagecourses"
                );
                let data = await response.json();
                // Assuming the response data structure is similar to the previous one
                setLanguageCourses(data.courses_links);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLanguageCourses();
    }, []);

    return (
        <Flowbite>
            <div>
                <footer className="footer p-10 bg-base-200 text-base-content">
                    <aside className="lg:w-[361px]">
                        <Image
                            className="block dark:hidden"
                            src={pnylogonew}
                            alt=""
                            width={159}
                        />
                        <Image
                            className="dark:block hidden"
                            src={pnylogodark}
                            alt=""
                            width={159}
                        />
                        <p>
                            {" "}
                            <span className="font-bold">Head Office</span> <br />
                            Office # 1, Level # 14, Arfa Software Technology Park, Ferozepur
                            Road Lahore, Pakistan Phone: 03041111774 Whatsapp: 03201443744
                        </p>
                    </aside>
                    <nav className="max-sm:text-sm">
                        <header className=" text-black font-bold  dark:text-white">
                            Quick Link
                        </header>
                        <Link href="/faqs" className="hover:text-blue-500">
                            FAQs
                        </Link>
                        <Link
                            href="https://lms.pnytraining.com"
                            className="hover:text-blue-500"
                        >
                            Admission
                        </Link>
                        <Link href="/gallery" className="hover:text-blue-500">
                            Gallery
                        </Link>
                        <Link href="/terms-conditions" className="hover:text-blue-500">
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy-policy" className="hover:text-blue-500">
                            Privacy Policy
                        </Link>
                        <Link
                            href="/best-institute-for-it-courses-in-arfa-karim-tower"
                            className="hover:text-blue-500"
                        >
                            Best Institute in Arfa
                        </Link>
                        <Link
                            href="/best-online-it-institute-in-lahore"
                            className="hover:text-blue-500"
                        >
                            Best Institute in Lahore
                        </Link>
                    </nav>

                    <div>
                        <h1 className="text-black font-bold dark:text-white">
                            Courses Offered
                        </h1>
                        <ul className="space-y-3">
                            {offeredCourses.slice(0, 5).map((course) => (
                                <li key={course.id} className="hover:text-blue-500">
                                    <Link href={course.url_slug}>{course.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h1 className="text-black font-bold dark:text-white">
                            Language Courses
                        </h1>
                        <ul className="space-y-2">
                            {languageCourses.map((course) => (
                                <li key={course.id} className="hover:text-blue-500">
                                    <Link href={course.url_slug}>{course.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav>
                        <h1 className="text-black font-bold dark:text-white">
                            Short Courses
                        </h1>

                        <div className="flex flex-col space-y-2 ">
                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-lahore"
                            >
                                Short courses in Lahore
                            </Link>

                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-rawalpindi"
                            >
                                Short courses in Rawalpindi
                            </Link>

                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-karachi"
                            >
                                Short courses in Karachi
                            </Link>
                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-faisalabad"
                            >
                                Short courses in Faisalabad
                            </Link>
                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-gujranwala"
                            >
                                Short courses in Gujranwala
                            </Link>
                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-multan"
                            >
                                Short courses in Multan
                            </Link>
                            <Link
                                className="hover:text-blue-500"
                                href="/blog/short-course-in-sialkot"
                            >
                                Short courses in Sialkot
                            </Link>
                            <Link
                                className="hover:text-blue-500"
                                href="/short-courses-in-azad-kashmir"
                            >
                                Short courses in Azad-Kashmir
                            </Link>
                        </div>
                    </nav>
                </footer>

                <div className=" border-b-2 border-blue-600"></div>

                {/* Our Branches--------------------------------------------------------------------------------------------- */}
                <div className=" text-center bg-base-300 text-xl font-semibold p-2">
                    Our Branches
                </div>

                <footer class="bg-base-200 text-base-content p-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Image src={arfatower} alt="Arfa Tower" class="mb-2" />
                            <h2 class="text-black font-bold dark:text-white">
                                Arfa Tower (Head Office)
                            </h2>
                            <p>
                                Office 1, Level #14, Arfa Software Technology Park, Ferozepur
                                Road, Lahore
                            </p>
                        </div>
                        <div>
                            <Image src={iqbaltown} alt="Iqbal Town" class="mb-2" />
                            <h2 class="text-black font-bold dark:text-white">Iqbal Town</h2>
                            <p>743 B Kashmir Block Allama Iqbal Town, Lahore</p>
                        </div>
                        <div>
                            <Image src={johartown} alt="Johar Town" class="mb-2" />
                            <h2 class="text-black font-bold dark:text-white">Johar Town</h2>
                            <p>
                                1st Floor 256 / A, Block R2 Near Shaukat Khanam Hospital, next
                                to Standard Chartered, Lahore
                            </p>
                        </div>
                        <div>
                            <Image
                                className="rounded-full"
                                src={shad}
                                alt="Rawalpindi"
                                class="mb-2"
                                width={60}
                            />
                            <h2 class="text-black font-bold dark:text-white">
                                Shahdara Branch
                            </h2>
                            <p>
                                Office#1, Floor#2, Al-Habib Bank, Phool Mandi, Al Saeed Chowk
                                Saggian, Bypass Lahore-Jaranwala Rd, Lahore, Pakistan
                            </p>
                        </div>

                        <div>
                            <Image src={rawal} alt="Rawalpindi" class="mb-2" />
                            <h2 class="text-black font-bold dark:text-white">Rawalpindi</h2>
                            <p>
                                Office # 102, Floor #1 Talha Heights Plot # 21-D, 6th Road
                                Satellite Town, Rawalpindi
                            </p>
                        </div>

                        <div>
                            <Image src={multan} alt="Multan" class="mb-2" />
                            <h2 class="text-black font-bold dark:text-white">Multan</h2>
                            <p>237-B, Model Town, Main Boulevard, Multan</p>
                        </div>

                        <div>
                            <Image
                                className="rounded-full"
                                src={temp}
                                alt="Rawalpindi"
                                class="mb-2"
                                width={60}
                            />
                            <h2 class="text-black font-bold dark:text-white">
                                Sargodha Branch
                            </h2>
                            <p>
                                Mawk Tech Space, 2nd Floor Ahsan Cash & Carry, near zafar ullah chowk Sargodha
                            </p>
                        </div>
                        <div>
                            <Image
                                className="rounded-full"
                                src={temp}
                                alt="Rawalpindi"
                                class="mb-2"
                                width={60}
                            />
                            <h2 class="text-black font-bold dark:text-white">Saudi Arabia</h2>
                            <p>
                                Office No. 7, 1st Floor, ALJMAZ Building Prince Sultan Bin
                                Abdulaziz Rd, Above Dunkin Donuts Al Olaya, Riyadh 12221
                            </p>
                        </div>
                    </div>
                </footer>

                <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                    <aside>
                        <p className="text-xl font-bold dark:text-white ">
                            Courses We Offers in Cities
                        </p>
                        <div>
                            {[
                                "lahore",
                                "rawalpindi",
                                "karachi",
                                "multan",
                                "sialkot",
                                "faisalabad",
                                "gujranwala",
                                "azadKashmir",
                                "islamabad",
                                "sargodha",
                            ].map((city) => (
                                <button
                                    key={city}
                                    className="btn btn-link text-black dark:text-white"
                                    onClick={() => redirectToCity(city)}
                                >
                                    {city.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </aside>
                </footer>

                <section className="flex flex-col items-center justify-center gap-4 p-3 mb-10">
                    <div className="text-center">
                        Copyright © 2024 - All rights reserved by PNY Trainings
                    </div>
                    <div className="flex space-x-4">
                        {/* Icons with Links */}
                        <Link href="https://twitter.com/PnyTrainings" target="_blank">
                            <FaTwitter className="text-xl hover:text-blue-500" />
                        </Link>
                        <Link href="https://www.facebook.com/PNY.Trainings" target="_blank">
                            <FaFacebook className="text-xl hover:text-blue-500" />
                        </Link>
                        <Link
                            href="https://pk.linkedin.com/company/pny-trainings"
                            target="_blank"
                        >
                            <FaLinkedin className="text-xl hover:text-blue-700" />
                        </Link>
                        <Link
                            href="https://www.youtube.com/channel/UCdkE8Zm_dNclx3B7s-t6pBQ"
                            target="_blank"
                        >
                            <FaYoutube className="text-xl hover:text-red-600" />
                        </Link>
                        <Link href="https://www.instagram.com/pny.trainings/" target="_blank">
                            <FaInstagram className="text-xl hover:text-pink-600" />
                        </Link>
                        <Link href="https://www.dmca.com/Protection/Status.aspx?ID=7c917940-1e0d-4855-93f4-76d5632f1b81&refurl=https://www.pnytrainings.com/">
                            <img
                                className=" cursor-pointer h-10"
                                src="https://www.locklizard.com/wp-content/uploads/2023/04/dmca-protected.png"
                                alt=""
                            />
                        </Link>
                    </div>
                </section>
            </div>
        </Flowbite>
    );
};

export default Footer;
