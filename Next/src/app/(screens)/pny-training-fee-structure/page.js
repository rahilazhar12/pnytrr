import FeeStructure1 from "./FeeStructure1";

export default async function FeeStructure() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/metas/fee-sturcture', {
    cache: 'force-cache'
  })
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
      <FeeStructure1 />

    </>
  );
}