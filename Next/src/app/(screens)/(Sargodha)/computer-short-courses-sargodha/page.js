import Computersargodha1 from "./Computersargodha1";

export default async function Computersargodha() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/city/specialpage/computer-short-courses-sargodha')
    .then((response) => response.json())
    .then((data) => {
      const meta = {
        metatitle: data.special_page.meta_title,
        metadescription: data.special_page.meta_description || "Default meta description", // Fallback value
        name: data.special_page.name,
        canonicalUrl: data.special_page.full_url
      };



      return meta;
    })
    .catch((error) => {
      console.error("Error fetching metadata:", error);
      return {
        metatitle: '',
        metadescription: 'Error in fetching description',
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
      <Computersargodha1 />
    </>
  );
}
