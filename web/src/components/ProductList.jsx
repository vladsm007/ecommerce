import { useEffect, useState } from "react";
import { getProduct, deleteProduct, getProducts } from "../service/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Remover produto?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - R$ {p.price} (estoque: {p.stock})
            <button oneClick={() => (window.location.href = `/editar/${p.id}`)}>
              Edtiar
            </button>
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
