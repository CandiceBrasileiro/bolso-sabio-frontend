import React, { useContext } from 'react';
import '../../index.css';
import { Link } from 'react-router-dom';
import LogoBolsoSabio from '../../assets/Vector.jpg';
import styles from './Header.module.css';
// import { CgEnter } from "react-icons/cg";
// import { FaUser } from "react-icons/fa";
// import MenuList from '../MenuList/MenuList';

import { UserContext } from '../../Contexts/UserContext';

const Header = () => {

  const { name, auth } = useContext(UserContext);
  
  return (
    <header>
      <nav className={styles.header} style={{ width: '100%', padding: '18px' }}>
        <Link to={`${auth ? '/home' : '/' }`}> 
          <img src={LogoBolsoSabio} className="w-52 rounded p-2 bg-white" />
        </Link>
        { name ? (
          <>
          <div className="header-in flex flex-row justify-end" style={{ width: '100%' }}>
            <div className="p-2 bg-transparent text-sky-600 font-semibold ">
            <Link to="/home" className="mr-8"> 
                  Home
            </Link>
            <Link to={`/tipo-investimento`}  className="mr-8"> 
                  Tipos de Investimentos
            </Link>
            <Link to={`/investimento`}  className="mr-8">
                  Investimentos
            </Link>
            <Link to={`dashboard`} className="mr-10">
                  Dashboard
            </Link>
            <i className="pl-4 pr-4 px-2 py-2 mr-4 bg-[#1976D3] rounded text-white">
              {name} {" "}
              {/* <FaUser /> */}
            </i> 
            </div>
          </div>
          </> 
        ) : (     
          <div className="header-in gap-12 flex flex-row justify-end" style={{ width: '100%' }}>
            <div className="p-2 bg-transparent text-sky-600 font-semibold ">
              <Link to={`/login`}>          
                Login / Cadastrar {' '} 
                {/* <CgEnter />  */}
              </Link> 
           </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
