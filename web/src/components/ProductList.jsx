import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../service/api";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // O fetch acontece dentro de .then()/.catch() — chamadas assíncronas,
  // não violam a regra react-hooks/set-state-in-effect
  useEffect(() => {
    //setLoading(true);
    getProducts()
      .then(({ data }) => setProducts(data))
      .catch(() => setError("Erro ao carregar produtos."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Remover produto?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch {
        alert("Erro ao excluir produto.");
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - R$ {p.price} (estoque: {p.stock})
            <button onClick={() => navigate(`/editar/${p.id}`)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
