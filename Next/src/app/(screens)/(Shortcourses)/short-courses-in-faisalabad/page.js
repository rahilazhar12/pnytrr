import Faislabad1 from "./Faislabad1";

export default async function Sialkotblogpage() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/shortcourse/short-courses-in-faisalabad', {
    cache: 'force-cache'
  })
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.metas[0].meta_title,
      metadescription: data.metas[0].meta_description,
      canonicalUrl: `https://www.pnytrainings.com/${data.course.page_slug}`
    }))
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
      <Faislabad1 />
    </>
  );
}
