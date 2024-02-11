import React from 'react';
import { IconContext } from 'react-icons';
import { FaGithubAlt, FaLinkedinIn } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import LogoBolsoSabio from '../../assets/Vector.jpg';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <img src={LogoBolsoSabio} />
      </div>
      <div className={styles.column1}>
        <div>
          <h3>Contato</h3>
          <br />
          Candice Lopes
          <br />
          João Pessoa - PB
          <hr />
          +55 83 *****-****
          <br />
          candicelopes88@gmail.com
          <hr />
          <IconContext.Provider
              value={{ className: 'shared-class', size: 26 }}
            >
             <div className={styles.icons}>
                <Link to={`https://github.com/CandiceBrasileiro`}>
                  <FaGithubAlt />
                </Link>
                <Link
                to={`https://www.linkedin.com/in/candice-brasileiro-25ab271aa/`}
              >
                <FaLinkedinIn />
                </Link>
              </div> 
                
            </IconContext.Provider>
        </div>
      </div>
      <div className={styles.column1}>
      <h3>INFORMAÇÕES</h3>
          <br />
          <Link to={`/tipo-investimento`}>Tipo de Investimentos</Link>
          <br />
          <Link to={`/investimento`}>Investimento</Link>
          <br />
          <Link to={`/dashboard`}>Dashboard</Link>
          <br />
          Termos e Condições
      </div>
      <div className="text-xs pl-4 pb-4">
        Candice Lopes © Alguns direitos reservados
      </div>

    </footer>
  );
};

export default Footer;
