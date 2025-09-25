import styles from './Hospedagens.module.scss';
import { useState, useEffect } from 'react';
import { ImgHotel } from '../../types/types';
import axios from 'axios';

const Hospedagens = () => {
  /*---- ESTADOS PARA GERENCIAR HOTÉIS E FILTRO ATIVO ----*/
  const [hoteis, setHoteis] = useState<ImgHotel[]>([]);
  const [filterActive, setActiveFilter] = useState<string>('Luxo');
  const [hoteisFiltrados, setHoteisFiltrados] = useState<ImgHotel[]>([]);

  /*---- FUNÇÃO PARA ALTERAR O FILTRO ATIVO DE ACORDO COM A CATEGORIA CLICADA ----*/
  const handleFiltroClick = (category: string): void => setActiveFilter(category);

  /*---- BUSCA DAS IMAGENS DOS HOTÉIS NA API ----*/
  useEffect(() => {
    const getHoteis = async () => {
      try {
        const response = await axios.get('/hoteisImg.json');
        setHoteis(response.data.hoteis);
      } catch (error) {
        console.error('Erro ao carregar as imagens:', error);
        return [];
      }
    };
    getHoteis();
  }, []);

  /*---- FILTRA AS IMAGENS DOS HOTÉIS DE ACORDO COM A CATEGORIA SELECIONADA ----*/
  useEffect(() => {
    const hoteisFiltered = hoteis.filter((hotel) => hotel.category === filterActive);
    setHoteisFiltrados(hoteisFiltered);
  }, [filterActive, hoteis]);

  return (
    <section id="Hospedagens" className={styles.container_hospedagens}>
      <div className={styles.container_width}>
        <h2 className={styles.titulo_hospedagens}>Hospedagens</h2>
        <p className={styles.texto_hospedagens}>
          Promoções incriveís para hotéis nos destinos mais buscados
        </p>
        <div className={styles.container_hoteis}>
          <div className={styles.box_filtraHoteis}>
            <button
              className={`${styles.btn_filtrarHoteis} ${
                filterActive === 'Luxo' ? styles.active : ''
              }`}
              onClick={() => handleFiltroClick('Luxo')}
            >
              Luxo
            </button>
            <button
              className={`${styles.btn_filtrarHoteis} ${
                filterActive === 'Simples' ? styles.active : ''
              }`}
              onClick={() => handleFiltroClick('Simples')}
            >
              Simples
            </button>
          </div>
          <div className={styles.container_boxHoteis}>
            {hoteisFiltrados.map((hotel) => (
              <div key={hotel.id} className={styles.box_hotel}>
                <img
                  className={styles.img_hotel}
                  src={hotel.url}
                  alt={`Imagem do hotel ${hotel.name}`}
                />
                <h3 className={styles.titulo_hoteis}>
                  #{hotel.id} {hotel.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hospedagens;
