import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../service/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // O fetch acontece dentro de .then()/.catch() — chamadas assíncronas,
  // não violam a regra react-hooks/set-state-in-effect
  useEffect(() => {
    getProducts()
      .then(({ data }) => setProducts(data))
      .catch((error) => {
        console.error("Erro ao carregar produtos", error);
        setProducts([]);
      });
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (confirm("Remover produto?")) {
      await deleteProduct(id);
      // Incrementar refreshKey dispara o useEffect sem chamar setState dentro dele
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - R$ {p.price} (estoque: {p.stock})
            <button onClick={() => (window.location.href = `/editar/${p.id}`)}>
              Editar
            </button>
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
