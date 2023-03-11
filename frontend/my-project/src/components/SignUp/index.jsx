import React, { useState } from "react";
import './style.css'
import Modal from 'react-modal';
import axios from 'axios'
import { connect } from "react-redux";
import { setUser } from "../../reducers/userActions";
// import { Link } from 'react-router-dom';

// Modal.setAppElement("#root")

const SignUp = ({ user, setUser, atualizarStatusRegister }) => {

    // MODAL REGISTRAR
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCloseModalRegister = () => {
        atualizarStatusRegister(false);
        setIsModalRegisterOpen(false);
    };

    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(true);

    // AÇÃO PARA REGISTRAR
    const REGISTER_URL = 'http://localhost:8080/register';

    const handleRegisterUser = async (event) => {
        event.preventDefault();

        const data = { name, email, password };

        try {
            // Verifica se todos os campos foram preenchidos
            if (!name || !email || !password) {
                throw new Error("Pora favor, preencha todos os campos");
            }

            // Envia a solicitação para o servidor
            const response = await axios.post(REGISTER_URL, data);

            // Verifica a resposta do servidor
            if (response.status === 201) {
                handleCloseModalRegister();
            }
        } catch (error) {
            // Exibe a mensagem de erro na tela
            const message = error.response?.data?.message || error.message;
            alert(message);
        }
    };



    return (
        <>
            <Modal
                isOpen={isModalRegisterOpen}
                onRequestClose={handleCloseModalRegister}
                className="modal">

                <h2>Registrar usuário</h2>
                <form>
                    <label htmlFor="name">Nome:</label>
                    <input required onChange={(e) => setName(e.target.value)} type="text" />

                    <label htmlFor="email">Email:</label>
                    <input required onChange={(e) => setEmail(e.target.value)} type="email" />

                    <label htmlFor="password">Senha:</label>
                    <input required autocomplete="current-password" onChange={(e) => setPassword(e.target.value)} type="password" />

                    <button type="submit" onClick={(event) => handleRegisterUser(event)}>Registrar</button>
                </form>
                <button className="closeModal" onClick={handleCloseModalRegister}>X</button>
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


const ConnectedSignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default ConnectedSignUp;

