import React from 'react';
import CourseDetails from './courseDetails';

export async function generateStaticParams() {
    const res = await fetch('https://www.admin777.pny-trainings.com/api/course');
    const courses = await res.json();

    if (!Array.isArray(courses)) {
        console.error('API response is not an array:', courses);
        return [];
    }

    return courses.map((course) => ({
        slug: course.url_slug,
    }));
}

export default async function Home({ params }) {
    const metadata = await fetch(
        `https://www.admin777.pny-trainings.com/api/course/${params.slug}`,
        {
            cache: "no-cache",
        }
    )
        .then((response) => response.json())
        .then((data) => ({
            metatitle: data.course?.meta_title || "",
            metadescription: data.course?.meta_description || "",
            canonicalUrl: `https://pnytrainings.com/${data.course?.url_slug}` || "",
        }))
        .catch((error) => {
            console.error("Error fetching metadata:", error);
            return {
                metatitle: "",
                metadescription: "",
                canonicalUrl: ""
            };
        });

    return (
        <>
            <title>{metadata.metatitle}</title>
            <meta name="description" content={metadata.metadescription} />
            <link rel="icon" href="/favicon.ico" />
            {metadata.canonicalUrl && (
                <link rel="canonical" href={metadata.canonicalUrl} />
            )}

            <CourseDetails params={params} />
        </>
    );
}
