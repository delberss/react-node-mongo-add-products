import React, { useState } from "react";

import './style.css'
import Modal from 'react-modal';

import { connect } from "react-redux";
import { setUser } from "../../reducers/userActions";

import SignUp from "../SignUp";
import SignIn from "../SignIn";


Modal.setAppElement("#root")

const Header = ({ user, setUser }) => {

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);


  // ATUALIZA SITUAÇÃO DO MODAL NO COMPONENTE SIGNIN E SIGNUP
  const atualizarStatusLogin = (valor) => {
    setShowSignIn(valor);
  } 
  const atualizarStatusRegister = (valor) => {
    setShowSignUp(valor);
  } 

  // ATUALIZA MODAL ENTRAR E REGISTRAR
  const handleOpenModalLogin = () => {
    setShowSignIn(true);
  };
  const handleOpenModalRegister = () => {
    setShowSignUp(true)
  }
  
  
  // LOG OUT
  const handleRemoveUser = () => {
    setUser({});
    localStorage.removeItem("the_user");
  };


  return (
    <div className="Header">
      <div className="logo">
        <h1>Consulte seu produto</h1>
      </div>

      <div className="About">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          {
            Object.keys(user).length !== 0 ?
            <li><a href="/products">Produtos</a></li>
            :
            <li><a href="/">Produtos</a></li>
          }
          
        </ul>
      </div>

      {
        Object.keys(user).length !== 0 ?
          <div className="UserOn">
            <span className="userName">Olá, {user.name}</span>
            <button onClick={() => handleRemoveUser()}>SAIR</button>
          </div>
          :
          <div className="UserOff">
            <button onClick={handleOpenModalLogin}>Entrar</button>
            <button onClick={handleOpenModalRegister}>Registrar</button>
          </div>
      }

      {showSignUp && <SignUp atualizarStatusRegister={atualizarStatusRegister}/>}
      {showSignIn && <SignIn atualizarStatusLogin={atualizarStatusLogin}/>}

    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(setUser(user))
});

const mapStateToProps = state => ({
  user: state.user
});

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
