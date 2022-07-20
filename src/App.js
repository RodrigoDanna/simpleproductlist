import './App.css';

import { useState } from 'react';
import { useProducts } from './hooks/useProducts';

const apiUrl = "http://localhost:3000/products/";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // fetch data
  const { data: items, productsRequest, loading, error } = useProducts(apiUrl);

  // add
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    }

    productsRequest(product, "POST");

    setName("");
    setPrice("");
  };

  return (
    <div className="App">
        <h1>Lista de Produtos</h1>
        {loading && <p>Carregando dados...</p>}
        {!loading && !error && (
          <ul>
            {items?.map((product) => (
              <li key={product.id}>{product.name} - ${product.price}</li>
            ))}
          </ul>
        )}
        {error && <p>{error}</p>}
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>Name: <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} required /></label>
            <label>Price: <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} required /></label>
            <button disabled={loading}>Create</button>
          </form>
        </div>
    </div>
  );
}

export default App;
