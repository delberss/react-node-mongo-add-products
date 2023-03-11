import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import { connect } from "react-redux";



const Rotas = ({user}) => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' exact element={<About />} />
                <Route path='/products' exact element={<Products />} />
            </Routes>
        </BrowserRouter>
    )
 }

 const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
  const ConnectedRotas = connect(mapStateToProps)(Rotas);
  
  export default ConnectedRotas;