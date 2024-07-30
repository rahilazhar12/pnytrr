import Sialkot1 from "./Sialkot1";

export default async function Sialkotblogpage() {
  const metadata = await fetch(`https://www.admin777.pny-trainings.com/api/shortcourse/short-course-in-sialkot`, {
    cache: 'force-cache'
  })
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.meta_title,
      metadescription: data.meta_description
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
      <Sialkot1 />

    </>
  );
}