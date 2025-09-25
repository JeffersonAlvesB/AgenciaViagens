import styles from './Header.module.scss';
import Logo from '../../assets/Logo.png';
import { useState } from 'react';
import User from './UserModal/User';
import { Link } from 'react-router-dom';
import { useRegisterStore } from '../../store/useRegisterStore';

const Header = () => {
  /*---- ESTADOS GERAIS ----*/
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showUser, setShowUser] = useState<boolean>(false);

  /*---- ESTADO GLOBAL QUE VERIFICA USUÁRIO LOGADO ----*/
  const { isUserLogin } = useRegisterStore();

  /*---- FUNÇÕES DO MENU HAMBURGUER ----*/
  const menuHamburgue = (): void => setIsOpen(!isOpen);
  const fecharMenuHamburgue = (): void => setIsOpen(false);

  /*---- FUNÇÕES DO ABRIR E FECHAR MENU DO USUÁRIO ----*/
  const toggleUser = (): void => setShowUser((prev) => !prev);

  /*---- LINKS DE NAVEGAÇÃO ----*/
  const navLinks: string[] = ['Home', 'Destinos', 'Depoimentos', 'Hospedagens'];

  return (
    <>
      <header className={styles.container_header}>
        <div className={styles.container_width}>
          <div className={styles.menu_icon} onClick={menuHamburgue}>
            <div className={`${styles.menu_linha} ${isOpen ? styles.active : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <img className={styles.logo_header} src={Logo} alt="Logo" />
          <nav>
            <ul className={`${styles.container_links} ${isOpen ? styles.open : ''}`}>
              <li className={styles.lista_logoNav}>
                <img className={styles.logo_nav} src={Logo} alt="Logo" />
              </li>
              {navLinks.map((link) => (
                <li key={link} className={styles.lista_links}>
                  <a
                    onClick={fecharMenuHamburgue}
                    className={styles.links_ancora}
                    href={`#${link}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            to="/registrar"
            className={`${styles.link_login} ${isUserLogin ? styles.hide : ''}`}
          >
            Login
          </Link>
          <button
            className={`${styles.link_user} ${isUserLogin ? '' : styles.hide}`}
            onClick={toggleUser}
          >
            <i className="bi bi-person-square"></i>
          </button>
        </div>
      </header>

      {showUser && <User onClose={toggleUser} />}
    </>
  );
};

export default Header;
