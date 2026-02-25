import styles from './Footer.module.scss';
import imgLogo from '../../assets/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.container_footer}>
      <div className={styles.container_width}>
        <div>
          <img className={styles.logo_footer} src={imgLogo} alt="" />
        </div>
        <div>
          <h3 className={styles.titulo_footer}>
            Copyright © 2025 Jefferson Domiciano - Thynk Travel
          </h3>
        </div>
        <div className={styles.box_midias}>
          <a
            className={styles.link_midias}
            href="https://github.com/JeffersonAlvesB"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon className={styles.icon_midia} icon={faGithub} />
          </a>
          <a
            className={styles.link_midias}
            href="https://wa.link/0dyaqq"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FontAwesomeIcon className={styles.icon_midia} icon={faWhatsapp} />
          </a>
          <a
            className={styles.link_midias}
            href="mailto:alvesjefferson1288@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <FontAwesomeIcon className={styles.icon_midia} icon={faEnvelope} />
          </a>
          <a
            className={styles.link_midias}
            href="https://www.linkedin.com/in/jefferson-alves-a0019930a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon className={styles.icon_midia} icon={faLinkedin} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
