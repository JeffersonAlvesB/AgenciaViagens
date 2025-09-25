import styles from './User.module.scss';
import { IoIosLogOut, IoIosAirplane } from 'react-icons/io';
import { RiCloseLargeFill } from 'react-icons/ri';
import { useRegisterStore } from '../../../store/useRegisterStore';
import IconUser from '../../../assets/iconUser.png';
import ModalMyPacotes from '../../ModalMyPacotes/ModalMyPacotes';
import { useState } from 'react';

type Props = {
  onClose: () => void;
};

const User = ({ onClose }: Props) => {
  /*---- ESTADOS GERAIS ----*/
  const [showMyPacotes, setShowMyPacotes] = useState(false);
  const [isVisibleUser, setIsVisibleUser] = useState(true);

  /*---- OBTÉM DADOS DO USUÁRIO DO STORE ----*/
  const { fullName, email, imgUser } = useRegisterStore();

  /*---- FUNÇÃO PARA FAZER LOGOUT ----*/
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  /*---- FUNÇÕES DOS MODAIS ----*/
  const toggleMyPacotes = () => {
    setIsVisibleUser(false); // esconde o User
    setShowMyPacotes(true); // mostra o modal
  };

  const handleCloseModal = () => {
    setShowMyPacotes(false);
    setIsVisibleUser(true);
  };

  return (
    <>
      {isVisibleUser && (
        <div className={styles.container_userProfile}>
          <div className={styles.box_userProfile}>
            <div className={styles.box_nameEmail}>
              <img
                className={styles.user_img}
                src={imgUser || IconUser}
                alt="foto de perfil do usuário"
              />
              <div>
                <h3 className={styles.nome_user}>{fullName}</h3>
                <span className={styles.email_user}>{email}</span>
              </div>
            </div>
            <div className={styles.box_btns}>
              <button className={styles.btn_edit} onClick={toggleMyPacotes}>
                <IoIosAirplane className={styles.icon_btn} />
                Meus Pacotes
              </button>
              <button className={styles.btn_logOut} onClick={handleLogout}>
                <IoIosLogOut className={styles.icon_btn} />
                Sair
              </button>
            </div>
            <button onClick={onClose} className={styles.btn_close}>
              <RiCloseLargeFill />
            </button>
          </div>
        </div>
      )}

      {showMyPacotes && <ModalMyPacotes onCloseModal={handleCloseModal} />}
    </>
  );
};

export default User;
