import Kashmir from "./Kashmir";

export default async function Kashmirpage() {
    const metadata = await fetch(
        `https://www.admin777.pny-trainings.com/api/shortcourse/short-courses-in-azad-kashmir`,
        {
            cache: 'force-cache'
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return {
                metatitle: data.courses[0]?.meta_title || 'Default Title',
                metadescription: data.courses[0]?.meta_description || 'Default Description',
                canonicalUrl: data.courses[0]?.url_slug ? `https://www.pnytrainings.com/${data.courses[0].url_slug}` : ''
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
            <Kashmir />
        </>
    );
}
