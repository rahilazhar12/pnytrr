import Clientcity from "./Clientcity";

// Predefined list of cities with their slugs
const cities = [
    { slug: "lahore" },
    { slug: "karachi" },
    { slug: "islamabad" },
    { slug: "rawalpindi" },
    { slug: "sargodha" },
    { slug: "multan" },
    { slug: "sialkot" },
    { slug: "faisalabad" },
    { slug: "gujranwala" },
    { slug: "azadKashmir" },
    // Add more cities as needed
];

// Function to generate static params for /city/[slug]
export function generateStaticParams() {
    // Generate the params array directly from the predefined list
    const paramsArray = cities.map((city) => ({
        slug: city.slug,
    }));

    return paramsArray;
}

// Page component
export default async function Page({ params }) {
    let metadata = {
        metatitle: "",
        metadescription: "",
    };

    try {
        const response = await fetch(

            `https:https://www.admin777.pny-trainings.com/api/city/${params.slug}`,

            {
                cache: "force-cache",
            }
        );
        const data = await response.json();
        if (data.special_pages && data.special_pages.length > 0) {
            metadata = {
                metatitle: data.special_pages[0].meta_title,
                metadescription: data.special_pages[0].meta_description,
            };
        }
    } catch (error) {
        console.error("Error fetching metadata:", error);
    }

    return (
        <>
            <title>{metadata.metatitle}</title>
            <meta name="description" content={metadata.metadescription} />
            <link rel="icon" href="/favicon.ico" />
            <Clientcity params={params} />
        </>
    )
}
