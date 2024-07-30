import Multan from "./Multan";

export default async function Multanpage() {
    const metadata = await fetch(
        `https://www.admin777.pny-trainings.com/api/shortcourse/short-courses-in-multan`,
        {
            cache: 'force-cache'
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return {
                metatitle: data.courses[0]?.meta_title || 'Default Title',
                metadescription: data.courses[0]?.meta_description || 'Default Description',
                canonicalUrl: `https://www.pnytrainings.com/${data.courses[0]?.url_slug || ''}`
            };
        })
        .catch((error) => {
            console.error("Error fetching metadata:", error);
            return {
                metatitle: 'Default Title',
                metadescription: 'Default Description',
                canonicalUrl: ''
            };
        });

    return (
        <>
            <title>{metadata.metatitle}</title>
            <meta name="description" content={metadata.metadescription} />
            {metadata.canonicalUrl && (
                <link rel="canonical" href={metadata.canonicalUrl} />
            )}
            <Multan />
        </>
    );
}
