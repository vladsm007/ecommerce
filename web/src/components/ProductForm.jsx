import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, createProduct, updateProduct } from "../service/api";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, form);
    } else {
      await createProduct(form);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Preço"
        type="number"
        step="0.01"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="stock"
        placeholder="Estoque"
        type="number"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
