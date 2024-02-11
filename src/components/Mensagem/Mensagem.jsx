/* eslint-disable react/prop-types */
import styles from './Mensagem.module.css';
import { useState, useEffect } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Mensagem = ({ tipo, msg }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[tipo]} `}> <ErrorOutlineIcon /> {msg}</div>
      )}
    </>
  );
};

export default Mensagem;
