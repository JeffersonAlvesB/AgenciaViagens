import { RiCloseLargeFill } from 'react-icons/ri';
import styles from './ModalPacote.module.scss';
import dayjs from 'dayjs';

type Props = {
  data: any;
  onClose: () => void;
  buyFlight: () => void;
};

export default function ModalPacote({ data, onClose, buyFlight }: Props) {
  /*---- ARMAZENANDO NAS VARIÁVEIS A RESPOSTA DA API DE VOOS ----*/
  const segments = data.itineraries[0].segments;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  const price = data.price.total;
  const departureTime = dayjs(firstSegment.departure.at).format('HH:mm');
  const arrivalTime = dayjs(lastSegment.arrival.at).format('HH:mm');
  const duration = data.itineraries[0].duration.replace('PT', '').toLowerCase();
  const stops = segments.length - 1;

  return (
    <div className={styles.container_pageModal}>
      <div>
        <div className={styles.box_produto}>
          <span className={styles.oferta}>Melhor Oferta</span>
        </div>
        <div className={styles.container_pacotes}>
          <div className={styles.box_flight}>
            <div className={styles.data_pacote}>
              <h3 className={styles.flight_pacote}>
                Ida ({firstSegment.carrierCode})
              </h3>
              <p className={styles.fligh_data}>
                {dayjs(firstSegment.departure.at).format('ddd, DD MMM')}
              </p>
            </div>
            <span className={styles.fligh_classe}>Classe Econômica</span>
          </div>
          <div className={styles.container_flightDetails}>
            <div className={styles.box_departureInfos}>
              <h3 className={styles.times_local}>
                {firstSegment.departure.iataCode}{' '}
                <span className={styles.time}>{departureTime}</span>
              </h3>
              <p className={styles.local}>Aeroporto de origem</p>
            </div>
            <div className={styles.box_departureTimes}>
              <span className={styles.departureTimes}>Total: {duration}</span>
              <span className={styles.linha}></span>
              <span className={styles.paradas}>
                {stops === 0 ? 'Direto' : `${stops} parada${stops > 1 ? 's' : ''}`}
              </span>
            </div>
            <div className={styles.box_departureInfos}>
              <h3 className={`${styles.times_local} ${styles.times_local_destino}`}>
                <span className={styles.time}>{arrivalTime}</span>{' '}
                {lastSegment.arrival.iataCode}
              </h3>
              <p className={styles.local}>Aeroporto de destino</p>
            </div>
          </div>
          <div className={styles.box_pagamentos}>
            <div className={styles.total_price}>
              <h3 className={styles.total}>Total:</h3>
              <span className={styles.price}>
                R$ {parseFloat(price).toLocaleString('pt-BR')}
              </span>
            </div>
            <button onClick={buyFlight} className={styles.btn_compra}>
              Comprar
            </button>
          </div>
          <button onClick={onClose} className={styles.btn_close}>
            <RiCloseLargeFill />
          </button>
        </div>
      </div>
    </div>
  );
}
