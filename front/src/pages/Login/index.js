import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import {FiLogIn} from 'react-icons/fi'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Login(){

    const [id,setId]= useState('');
    const history = useHistory();

    if(localStorage.getItem('ongId')){
        history.push('/profile');
    }
    
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('session',{id});
            console.log(response.data.name);
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile');
        }
        catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Entrar
                    </button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02141"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}