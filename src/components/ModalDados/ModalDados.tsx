import styles from './ModalDados.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

type Props = {
  text: string;
  linkNavigate?: boolean;
  onClose: () => void;
};

export default function ModalDados({ text, onClose, linkNavigate = false }: Props) {
  return (
    <div className={styles.container_modal_Dados}>
      <div className={styles.box_modal_Dados}>
        <h3 className={styles.titulo}>{text}</h3>
        {linkNavigate && (
          <Link to="/registrar" className={styles.link_login}>
            Fazer Login
          </Link>
        )}
        <button onClick={onClose} className={styles.btn_close}>
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
}
