import { useState } from "react";
import useFetch from "./Hooks/useFetch";
import "./App.css";

function App() {
  // call the useFetch function & give the URL
  const { data, loading, error } = useFetch(  
    "https://api.escuelajs.co/api/v1/products",
  );

  // If the return loading send anything then show it in webpage 
  if (loading) {
    return (
      <div className="status">
        <h3>Loading...</h3>
      </div>
    );
  }

  // If return any error then show in webpage
  if (error) {
    return (
      <div className="status">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="heading">
        <u>Products</u>
      </h1>
      <div className="products-container">
        {data.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image"
            />

            <h3>{product.title}</h3>

            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
