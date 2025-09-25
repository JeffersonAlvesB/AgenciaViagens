import styles from './Register.module.scss';
import Logo from '../../assets/Logo.png';
import Google from '../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { useRegisterStore } from '../../store/useRegisterStore';
import { useState } from 'react';
import ModalDados from '../../components/ModalDados/ModalDados';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Register = () => {
  /*---- STATES PARA MODAIS ----*/
  const [modalDadosInpts, setModalDadosInpts] = useState<boolean>(false);
  const [modalPassword, setmodalPassword] = useState<boolean>(false);

  /*---- HOOKS DE NAVEGAÇÃO ----*/
  const navigate = useNavigate();

  /*---- STORE DE REGISTRO ----*/
  const {
    fullName,
    email,
    password,
    repeatPassword,
    setFullName,
    setEmail,
    setPassword,
    setRepeatPassword,
    setImgUser,
    setIsUserLogin,
  } = useRegisterStore();

  /*---- FUNÇÕES DE VALIDAÇÃO ----*/
  const validateInputs = () => {
    if (
      fullName === '' ||
      email === '' ||
      password === '' ||
      repeatPassword === ''
    ) {
      setModalDadosInpts(true);
      closeModalDadosInpt();
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    if (repeatPassword !== password) {
      setmodalPassword(true);
      closeModalPassword();
      return false;
    }
    return true;
  };

  /*---- ENVIO DO FORMULÁRIO ----*/
  const formSub = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    if (!validatePassword()) return;

    setIsUserLogin(true);

    navigate('/');
  };

  /*---- FECHAMENTO DOS MODAIS E CONFIG ----*/

  const TWO_SECONDS = 2000;

  const closeModalDadosInpt = () => {
    setTimeout(() => {
      setModalDadosInpts(false);
    }, TWO_SECONDS);
  };

  const closeModalPassword = () => {
    setTimeout(() => {
      setmodalPassword(false);
    }, TWO_SECONDS);
  };

  /*---- LOGIN COM GOOGLE ----*/
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const user = res.data;
        setFullName(user.name);
        setEmail(user.email);
        setImgUser(user.picture);
        setIsUserLogin(true);

        navigate('/');
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <div className={styles.container_cadastro}>
        <form onSubmit={formSub} className={styles.form_cadastro}>
          <div className={styles.box_logo}>
            <img src={Logo} alt="logo da pagina" />
            <h2 className={styles.subtitulo}>Crie sua conta:</h2>
            <button
              type="button"
              onClick={() => login()}
              className={styles.login_google}
            >
              <img
                className={styles.google_img}
                src={Google}
                alt="Login com Google"
              />
            </button>
          </div>
          <div className={styles.box_seperar}>
            <span className={styles.linha}></span>
            <span className={styles.formas_login}>Ou</span>
            <span className={styles.linha}></span>
          </div>
          <div className={styles.container_inputs}>
            <label className={styles.box_nomeEmail}>
              <span className={styles.info_input}>Nome completo</span>
              <input
                className={styles.input_cadastro}
                type="text"
                placeholder="Digite seu nome completo..."
                value={fullName}
                maxLength={80}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label className={styles.box_nomeEmail}>
              <span className={styles.info_input}>Email</span>
              <input
                className={styles.input_cadastro}
                type="email"
                placeholder="Digite seu Email..."
                value={email}
                maxLength={250}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={styles.box_nomeEmail}>
              <span className={styles.info_input}>Crie uma senha</span>
              <input
                className={styles.input_cadastro}
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className={styles.box_nomeEmail}>
              <span className={styles.info_input}>Confirme a senha</span>
              <input
                className={styles.input_cadastro}
                type="password"
                placeholder="******"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </label>
            <input
              className={styles.input_registar}
              type="submit"
              value="Registrar"
            />
          </div>
        </form>
      </div>

      {modalDadosInpts && (
        <ModalDados
          text="Preencher todos os campos do Registro"
          onClose={() => setModalDadosInpts(false)}
        />
      )}

      {modalPassword && (
        <ModalDados
          text="As senha precisam ser iguais"
          onClose={() => setmodalPassword(false)}
        />
      )}
    </>
  );
};

export default Register;
