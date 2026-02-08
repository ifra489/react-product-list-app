import React,{useEffect,useState} from 'react'
import axios from 'axios';
const ProductList = () => {
    //loading state
const [loading,setLoading] = useState(true);
    //Data/Success state
    const [products,setProducts] = useState([]);
    //Error state
    const [error,setError] = useState(null);

    const apiUrl= 'https://fakestoreapi.com/products';

    useEffect(()=>{

    //! async-await approach
    const fetchProducts = async () => {
        try{
            const res=axios.get(apiUrl);
            setProducts((await res).data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);


        }
       
    }
     fetchProducts();
    },[]
)

    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
   return (
    <div style={styles.container}>
      <h1>Product List</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h3>{product.title}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
};


export default ProductList