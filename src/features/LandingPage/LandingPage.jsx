import React from 'react'
import styles from './LandingPage.module.css';
import { FaRegChartBar } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

const Home = () => {

  return (
    <>
    <section className={styles.homeContainer}>
    <div
        style={{padding: '4rem', color:'#333'}}
        
    >
      <h1>Acompanhe seus <br /> investimentos</h1>
      <br />
      <h2>Gerencie e acompanhe seus investimentos <br /> financeiros  de forma prática e eficiente</h2>
      </div>
    </section>
    <section className={styles.section1}>
      <div className={styles.textarea}>
          <FaRegChartBar />
        <p>Análises detalhadas, gráficos e relatórios personalizados </p>
      </div>
    </section>

    <hr className={styles.linha} />
    
    <section className={styles.section2}>
      <div className={styles.textarea}>
      <FaClipboardList />
        <p>Ideal para otimizar sua gestão financeira e alcançar seus objetivos de forma consistente</p>
      </div>
    </section>
    </>
  )
}

export default Home