import styles from './ModalMyPacotes.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';
import { usePacotesStore } from '../../store/usePacoteStore';

type Props = {
  onCloseModal: () => void;
};

export default function ModalMyPacotes({ onCloseModal }: Props) {
  const { pacotesComprados } = usePacotesStore();

  return (
    <div className={styles.container_MeusPacotes}>
      <div className={styles.box_MeusPacotes}>
        <h3 className={styles.titulo}>Meus Pacotes</h3>
        <div className={styles.box_viagens}>
          {pacotesComprados.length === 0 ? (
            <h4 className={styles.sem_viagens}>
              Você ainda não possui pacotes comprados.
            </h4>
          ) : (
            pacotesComprados.map((pacote) => (
              <h4 className={styles.viagem}>
                {pacote.destino} - Ida: {pacote.dataIda} às {pacote.horaIda} -
                Volta:&nbsp;
                {pacote.dataVolta}
              </h4>
            ))
          )}
        </div>
        <button onClick={onCloseModal} className={styles.btn_close}>
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
}
