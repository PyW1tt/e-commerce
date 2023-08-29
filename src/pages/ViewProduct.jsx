import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import useProducts from "../hook/useProducts";
import { useAddProduct } from "../context/addProduct";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ViewProduct() {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { img, getProductById, productById } = useProducts();
  const param = useParams();
  const [total, setTotal] = useState(0);
  const { cartItems, setCartItems } = useAddProduct();

  useEffect(() => {
    getProductById(param.id);
  }, []);

  function addToCart() {
    const newCart = [...cartItems];

    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.id === productById.id
    );
    if (existingCartItemIndex < 0) {
      newCart.push({
        ...productById,
        quantity: total,
      });
    } else {
      newCart[existingCartItemIndex].quantity += total;
    }
    setCartItems(newCart);
  }

  return (
    <>
      <NavBar />
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={img[0]}
            alt={productById.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={img[1]}
              alt={productById.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={img[2]}
              alt={productById.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            src={img[3]}
            alt={productById.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {productById.title}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            ${productById.price}
          </p>

          {/* Rating */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0.5, 1.5, 2.5, 3.5, 4.5].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      productById.rating > rating
                        ? " text-yellow-500"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {productById.stock} stock
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            </div>

            <RadioGroup className="mt-4">
              <RadioGroup.Label className="sr-only">
                Choose a quantity
              </RadioGroup.Label>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {quantity.map((number, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={number}
                    onClick={() => {
                      setTotal(number);
                    }}
                    className={({ active }) =>
                      classNames(
                        number
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        active ? "ring-2 ring-red-500" : "",
                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                      )
                    }
                  >
                    <RadioGroup.Label as="span">{number}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          <button
            type="submit"
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              if (total > 0) {
                addToCart();
              }
            }}
            disabled={total <= 0}
          >
            Add to Cart
          </button>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">
                {productById.description}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Brand</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{productById.brand}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <li className="text-gray-400">
                  <div className="text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </div>
                </li>
                <li className="text-gray-400">
                  <div className="text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </div>
                </li>
                <li className="text-gray-400">
                  <div className="text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Details</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                eius quam veniam maxime quis voluptas iste consectetur eum quae
                voluptates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewProduct;
