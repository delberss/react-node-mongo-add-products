import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import './style.css'
import axios from 'axios'


const Products = ({user}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${user._id}`);
                setProducts(response.data);
            } catch(error) {
                console.log(`Erro de conexão!`)
            }
        }
        fetchProducts();
    }, [products]);

    const handleRemoveProduct = async (idProduct) => {
        try {
          await axios.delete(`http://localhost:8080/remove/${user._id}/${idProduct}`);
          setProducts(products.filter(product => product.id !== idProduct));
        } catch(error) {
          console.log(`Erro de conexão!`);
          // Tratar possíveis erros aqui
        }
      }
      
    
    return(
        products.length > 0 ?
        <div className="products">
            <h2>Lista de Produtos</h2>
            {products.map(product => (
                <div key={product.id} className="product">
                    <div className="nameProduct">
                        <h3>{product.name}</h3>
                    </div>
                    <div className="buttonProduct">
                        <button onClick={() => handleRemoveProduct(product._id)}>Remover</button>
                    </div>
                </div>
            ))}
        </div>
        :
        <div className="products">
            <h2>Lista de produtos está vazia!</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
};

const ConnectedProducts = connect(mapStateToProps)(Products);

export default ConnectedProducts;
