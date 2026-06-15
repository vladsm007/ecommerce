import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Produtos</Link> | <Link to="/novo"> Novo Produto</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/novo" element={<ProductForm />} />
          <Route path="/editar/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
