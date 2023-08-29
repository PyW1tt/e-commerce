import "./App.css";
import HomePage from "./pages/HomePage";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./components/Cart";
import OrderSummaries from "./pages/OrderSummaries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/view/:id" element={<ViewProduct />} />
          <Route path="/summaries" element={<OrderSummaries />}></Route>
        </Routes>
        <Cart />
      </BrowserRouter>
    </>
  );
}

export default App;
