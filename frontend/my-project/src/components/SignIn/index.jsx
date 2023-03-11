import React, { useEffect, useState } from "react";
import './style.css'
import Modal from 'react-modal';
import axios from 'axios'
import { connect } from "react-redux";
import { setUser } from "../../reducers/userActions";

Modal.setAppElement("#root")

const SignIn = ({ setUser, atualizarStatusLogin }) => {
    // STATES DO MODAL LOGIN
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [isModalLoginOpen, setIsModalLoginOpen] = useState(true);

    // STYLE ERRO
    const setEmailError = () => {
        const input = document.querySelector('#emailLogin');
        input.className = 'error';
    }


    const setPasswordError = () => {
        const input = document.querySelector('#passwordLogin');
        input.className = 'error';
    }



    // CLOSE MODAL
    const handleCloseModalLogin = () => {
        atualizarStatusLogin(false);
        setIsModalLoginOpen(false);
    };


    // AÇÃO PARA FAZER LOGIN
    const LOGIN_URL = 'http://localhost:8080/login';

    const handleLoginUser = async (event) => {
        if (event) {
            event.preventDefault();
        }

        try {
            const data = { email: userEmail, password: userPassword };
            const response = await axios.post(LOGIN_URL, data);

            const user = response.data.user;
            setUser(user);
            localStorage.setItem('the_user', JSON.stringify(user));

            handleCloseModalLogin();
        } catch (error) {
            if (error.response.data.message === 'email') {
                setEmailError()
            }

            if (error.response.data.message === 'senha') {
                setPasswordError()
            }
        }
    };


    return (
        <>
            <Modal
                isOpen={isModalLoginOpen}
                onRequestClose={handleCloseModalLogin}
                className="modal">

                <h2>Login</h2>
                <form>

                    <label htmlFor="email">Email:</label>
                    <input
                        id="emailLogin"
                        type="email"
                        onChange={
                            (e) => {
                                setUserEmail(e.target.value);
                            }}
                    />

                    <label htmlFor="password">Senha:</label>
                    <input
                        id="passwordLogin"
                        autocomplete="current-password"
                        type="password"
                        onChange={
                            (e) => {
                                setUserPassword(e.target.value);
                            }}
                    />

                    <button type="submit" onClick={event => handleLoginUser(event)}>Entrar</button>
                </form>
                <button className="closeModal" onClick={handleCloseModalLogin}>X</button>
            </Modal>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(setUser(user))
});

const mapStateToProps = state => ({
    user: state.user
});


const ConnectedSignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default ConnectedSignIn;

