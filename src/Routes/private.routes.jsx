import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../features/Home/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FormTipoInvestimento from '../features/TipoInvestimento/index';
import Investimento from '../features/Investimento/index';
import Detalhe from '../features/Investimento/Detalhe';
import Dashboard from '../features/Dashboard/index';
import RedefinirSenha from '../features/NovaSenha/NovaSenha';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/tipo-investimento' element={<FormTipoInvestimento />} />
          <Route path='/investimento' element={<Investimento />} />
          <Route path='/investimento/:id' element={<Detalhe />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/redefinir-senha' element={<RedefinirSenha />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default PrivateRoutes;