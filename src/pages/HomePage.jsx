import { useEffect, useState } from "react";
import useProducts from "../hook/useProducts";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function HomePage() {
  const [searchProducts, setSearchProducts] = useState("");
  const { product, getProduct } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const skip = (currentPage - 1) * itemsPerPage;

  function updateSearch() {
    getProduct({ searchProducts, skip });
  }

  useEffect(() => {
    getProduct({ searchProducts, skip });
  }, [skip]);

  return (
    <>
      <NavBar>
        <div className=" lg:ml-6 flex">
          <input
            className="rounded-md px-3 py-2 text-sm font-medium w-80 mr-2 max-sm:w-full"
            type="text"
            placeholder="search here"
            value={searchProducts}
            onChange={(e) => {
              setSearchProducts(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateSearch();
                setSearchProducts("");
              }
            }}
          />
          <button
            className="p-2 text-gray-400 hover:text-gray-500 flex items-center"
            onClick={() => {
              setSearchProducts("");
              updateSearch();
            }}
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </NavBar>
      <div className="bg-white">
        <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-[96rem] lg:px-8 ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Our Shop
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {product.map((product, index) => (
              <div key={index} className="group relative">
                {" "}
                <Link to={`/view/${product.id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination flex justify-center">
          {currentPage > 1 ? (
            <button
              className="previous-button rounded-md px-3 py-2 text-sm font-medium w-22  bg-slate-400"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          ) : null}
          <div className="pages flex items-center mx-5">{currentPage}</div>
          {currentPage <= 4 && product.length === 20 ? (
            <button
              className="next-button previous-button rounded-md px-3 py-2 text-sm font-medium w-22 mr-2 bg-slate-400"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default HomePage;
