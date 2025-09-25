import styles from './Destinos.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Img } from '../../types/types';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';

import { EffectFlip, Pagination } from 'swiper/modules';

import { useState, useEffect } from 'react';

import axios from 'axios';

const Destinos = () => {
  /*---- ESTADOS ----*/
  const [images, setImages] = useState<Img[]>([]);

  /*---- BUSCA DE IMAGENS DA API ----*/
  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get('/imgs.json');
        setImages(response.data.images);
      } catch (error) {
        console.error('Erro ao carregar as imagens:', error);
      }
    };
    getImages();
  }, []);

  return (
    <section id="Destinos" className={styles.container_destinos}>
      <div className={styles.container_width}>
        <div className={styles.box_tituloTexto}>
          <div className={styles.box_titulo}>
            <h2 className={styles.titulo_destino}>
              Escolha os melhores destinos na melhor agencia
            </h2>
            <p className={styles.texto_infoDestino}>
              Com a Thynk Travel, você pode explorar os melhores destinos ao redor do
              mundo. Oferecemos pacotes personalizados para destinos exóticos, praias
              paradisíacas, cidades históricas e muito mais. Descubra novas culturas,
              experimente novos sabores e crie memórias inesquecíveis em sua próxima
              viagem.
            </p>
          </div>
          <div className={styles.box_subtitulo}>
            <h3 className={styles.subtitulo_destino}>Destinos Mais procurados</h3>
            <ul className={styles.container_listas}>
              <li className={`${styles.lista} ${styles.enfase}`}>Nova York</li>
              <li className={styles.lista}>Paris</li>
              <li className={styles.lista}>Fortaleza</li>
              <li className={styles.lista}>Califórnia</li>
              <li className={styles.lista}>Tóquio</li>
            </ul>
          </div>
        </div>
        <div className={styles.box_figuras}>
          {images.map((image) => (
            <img key={image.id} src={image.url} alt={`Destino ${image.id}`} />
          ))}
        </div>
        <div className={styles.box_carrosel}>
          <Swiper
            effect={'flip'}
            grabCursor={true}
            pagination={true}
            modules={[EffectFlip, Pagination]}
            className={styles.swiper}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className={styles.swiper_slide}>
                <div className={styles.swiper_box}>
                  <img src={image.url} alt={`Destino ${image.id}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Destinos;
