import Link from "next/link";
export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="text-center">
        <h1 className="text-white text-9xl font-bold">404</h1>
        <p className="text-white text-2xl">Oops, the page you're looking for doesn't exist.</p>
        <div className="mt-5">
          <Link href='/' className=" px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">
            GO TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
}
