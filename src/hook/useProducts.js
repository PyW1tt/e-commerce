import { useState } from "react";
import axios from "axios";

function useProducts() {
  const [product, setPorduct] = useState([]);

  const [img, setImg] = useState([]);
  const [productById, setPorductById] = useState([]);

  async function getProduct(input) {
    const { searchProducts, skip } = input;
    try {
      const result = await axios.get(
        `https://dummyjson.com/products/search?q=${searchProducts}&skip=${skip}&limit=20`
      );
      setPorduct(result.data.products);
    } catch (error) {
      console.log("Error");
    }
  }

  async function getProductById(param) {
    const result = await axios.get(`https://dummyjson.com/products/${param}`);
    setPorductById(result.data);
    setImg(result.data.images);
  }

  return { product, setPorduct, getProduct, img, getProductById, productById };
}

export default useProducts;
