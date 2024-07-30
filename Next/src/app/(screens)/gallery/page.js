import Gallery1 from "./Gallery1";

export default async function Gallery() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/gallery', {
    cache: 'force-cache'
  })
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.galleries[0].title,
      metadescription: ""
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
      <Gallery1 />

    </>
  );
}