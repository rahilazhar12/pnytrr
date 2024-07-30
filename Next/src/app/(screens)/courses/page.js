import Head from 'next/head';
import Link from 'next/link';

export async function fetchCategories() {
  const res = await fetch("https://www.admin777.pny-trainings.com/api/category", { cache: 'no-store' });
  const categories = await res.json();

  if (!Array.isArray(categories)) {
    console.error("API response is not an array:", categories);
    return [];
  }

  return categories;
}

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <>
      <Head>
        <title>Course Categories</title>
        <meta name="description" content="Browse all course categories offered by PNY Trainings." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/courses/${category.url_slug}`}>
              <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://www.admin777.pny-trainings.com/uploads/${category.category_image}`}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-full mr-4"
                  />
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                </div>
                <p className="text-gray-700">{category.description_short}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
