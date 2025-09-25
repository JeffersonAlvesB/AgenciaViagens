import styles from './Depoimentos.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Reviews } from '../../types/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

import axios from 'axios';

const Depoimentos = () => {
  /*---- ESTADOS ----*/
  const [usersReviews, setUsersReviews] = useState<Reviews[]>([]);
  const [navigationEnabled, setNavigationEnabled] = useState(
    window.innerWidth > 550
  );

  /*---- BUSCA DE REVIEWS DA API ----*/
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/reviews.json');
        setUsersReviews(response.data.reviews);
      } catch (error) {
        console.error('Erro ao carregar as reviews:', error);
        return [];
      }
    };
    getUsers();
  }, []);

  /*---- ESCONDER BOTÕES NAVEGAÇÃO SE TELA < 550px ----*/
  useEffect(() => {
    const handleResize = () => setNavigationEnabled(window.innerWidth > 550);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="Depoimentos" className={styles.container_depoimentos}>
      <div data-aos="fade-right" className={styles.container_width}>
        <h2 className={styles.titulo_depoimentos}>
          Veja o que nossos clientes dizem sobre nossos serviços:
        </h2>
        <aside className={styles.container_reviews}>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={false}
            pagination={{
              clickable: true,
            }}
            navigation={navigationEnabled}
            modules={[Pagination, Navigation]}
            className={styles.swiper_container}
          >
            {usersReviews.map((user) => (
              <SwiperSlide key={user.id} className={styles.swiper_slide}>
                <article className={styles.box_reviews}>
                  <div className={styles.reviews_imgTitulo}>
                    <img
                      className={styles.reviews_fotoPerfil}
                      src={user.img}
                      alt=""
                    />
                    <div>
                      <h3 className={styles.titulo_reviews}>{user.name}</h3>
                      <span key={user.id} className={styles.destino_reviews}>
                        Destino: {user.destination}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p key={user.id} className={styles.texto_reviews}>
                      {user.comment}
                    </p>
                  </div>
                  <div className={styles.box_stars}>
                    {[...Array(user.rating)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        className={styles.stars}
                        icon={faStar}
                      />
                    ))}
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </aside>
      </div>
    </section>
  );
};

export default Depoimentos;
