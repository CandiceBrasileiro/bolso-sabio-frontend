import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.css';

import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image4 from '../../assets/4.png';

const images = [image1, image2, image3, image4];

const Home = () =>{

    const carousel = useRef();
    const [width, setWidth] = useState(0)

    useEffect(() => {
        console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, []);

    return (
        <div className={styles.container}>
            <motion.div className={styles.carousel} ref={carousel}>
                <motion.div 
                className={styles.inner}
                drag="x"
                dragConstraints={{right: 0, left: -width}}
                initial={{x:100}}
                animate={{x:0}}
                transition={{ duration: 0.8}}
                >
                    {images.map(image => (
                        <motion.div key={image} className={styles.item}>
                            <img src={image} alt="Carrossel de apresentação" />
                        </motion.div>
                    ))}

                </motion.div>
            </motion.div>
        </div>
    )
}
export default Home;