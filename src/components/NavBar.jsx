import { Disclosure } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAddProduct } from "../context/addProduct";

function NavBar(props) {
  const { setOpen, totalCount } = useAddProduct();
  return (
    <Disclosure as="nav" className="bg-gray-200">
      <>
        <div className="lg:max-w-[96rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
              <div className="flex flex-shrink-0 items-center">
                <Link to={"/"}>
                  <img
                    className="h-10 w-auto"
                    src="https://e7.pngegg.com/pngimages/531/692/png-clipart-logo-graphic-design-art-online-shop-angle-text.png"
                    alt="Your Company"
                  />
                </Link>
              </div>
              {props.children}
            </div>

            <div className="ml-auto flex items-center lg:space-x-4">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <button
                  className="group -m-2 flex items-center p-2"
                  onClick={() => setOpen(true)}
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalCount}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </button>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}

export default NavBar;
