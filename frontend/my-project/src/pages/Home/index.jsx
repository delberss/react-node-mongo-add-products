import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./style.css";


const Home = ({ user }) => {

  const [product, setProduct] = useState("");

  const handleAddProduct = async() => {
    try{
      const newProduct = { name: product };
      const response = await axios.post(`http://localhost:8080/add/product/${user._id}`, newProduct);
      
      setProduct("");
    } catch(error){
      console.log(`Erro de conexão!`)
    }

  }

  return (
    <div className="Home">
      {
        Object.keys(user).length !== 0 ?
        <div className="QueryProduct">
          <h2>Olá, {user.name}. Adicione produtos</h2>
          <input 
            type="text" 
            placeholder="Digite um produto"
            value={product} 
            onChange={e => setProduct(e.target.value)} />
          <button onClick={handleAddProduct}>Adicionar</button>
        </div>
        :
        <div>
          <h2>Faça seu cadastro!</h2>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;