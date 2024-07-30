import Galleryclient from "./Galleryclient";

export async function generateStaticParams() {
    const res = await fetch('https://www.admin777.pny-trainings.com/api/gallery');
    const data = await res.json();
    const galleries = data.galleries;

    if (!Array.isArray(galleries)) {
        console.error('API response is not an array:', galleries);
        return [];
    }

    return galleries.map((gallery) => ({
        id: gallery.id.toString(),
    }));
}

const Page = ({ params }) => {
    return (
        <>
            <Galleryclient params={params} />
        </>
    )
}

export default Page;
