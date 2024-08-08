import BestInstituteInLahore from './Bestinstituteinlahore';

const Page = async () => {
    const metadata = await fetch("https://www.admin777.pny-trainings.com/api/pages/best-online-it-institute-in-lahore")
        .then((response) => response.json())
        .then((data) => ({
            metatitle: data.metas[0].meta_title,
            metadescription: data.metas[0].meta_description
        }))
        .catch((error) => {
            console.error("Error fetching metadata:", error);
            return {
                metatitle: '',
                metadescription: ''
            };
        });
    return (
        <>

            <title>{metadata.metatitle}</title>
            <meta name="description" content={metadata.metadescription} />
            <link rel="canonical" href="https://www.admin777.pny-trainings.com/best-online-it-institute-in-lahore" />

            <BestInstituteInLahore />
        </>
    );
}

export default Page;
