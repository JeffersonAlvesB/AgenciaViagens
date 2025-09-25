import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './ModalSucess.module.scss';

type Props = {
  onClose: () => void;
};

export default function ModalSucess({ onClose }: Props) {
  return (
    <div className={styles.container_modal}>
      <div className={styles.box_modal}>
        <DotLottieReact
          src="https://lottie.host/c54c51ae-41ec-4054-8f03-49cf6bec6529/gWW6hzW7SW.lottie"
          // loop
          autoplay
          style={{
            width: '80px',
            height: '80px',
          }}
        />
        <div className={styles.titulo_texto}>
          <h3 className={styles.titulo}>Sucesso!</h3>
          <p className={styles.texto}>
            Seu pacote de viagem está confirmado! Boa viagem!
          </p>
        </div>
        <button onClick={onClose} className={styles.btn_close}>
          OK
        </button>
      </div>
    </div>
  );
}
