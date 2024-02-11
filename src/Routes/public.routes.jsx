import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../features/LandingPage/LandingPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../features/Login/Login'
import Cadastro from '../features/Cadastro/Cadastro';
import RecuperarSenha from '../features/RecuperarSenha/RecuperarSenha'


const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastre-se' element={<Cadastro />} />
                    <Route path='/recuperar-senha' element={<RecuperarSenha />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default PublicRoutes