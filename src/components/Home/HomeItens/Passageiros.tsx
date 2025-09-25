import styles from './Passageiros.module.scss';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { useEffect } from 'react';

type Props = {
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  baby: number;
  setBaby: (value: number) => void;
};

const Passageiros = ({
  adults,
  setAdults,
  children,
  setChildren,
  baby,
  setBaby,
}: Props) => {
  /*---- LIMITE MÁXIMO DE PASSAGEIROS ----*/
  const MAX_PASSENGERS_LIMIT = 9;

  /*---- GARANTIR QUE OS VALORES NÃO ULTRAPASSEM OS LIMITES ----*/
  useEffect(() => {
    setChildren(Math.min(children, adults));
    setBaby(Math.min(baby, adults));
    setAdults(Math.min(adults, MAX_PASSENGERS_LIMIT));
  }, [adults, children, baby]);

  return (
    <div className={styles.container_passageiroCounter}>
      <div className={styles.box_passageiroCounter}>
        <div className={styles.box_passageiroInfo}>
          <h3 className={styles.passageiro_faixaEtaria}>Adultos</h3>
          <span className={styles.passageiro_idade}>12 anos ou mais</span>
        </div>
        <div className={styles.box_quantidadePassageiro}>
          <button
            className={styles.btn_menos}
            type="button"
            onClick={() => setAdults(adults > 0 ? adults - 1 : 0)}
            disabled={adults === 0}
          >
            <CiCircleMinus />
          </button>
          <span>{adults}</span>
          <button
            className={styles.btn_mais}
            onClick={() => setAdults(adults + 1)}
            type="button"
            disabled={adults >= 9}
          >
            <CiCirclePlus />
          </button>
        </div>
      </div>

      <div className={styles.box_passageiroCounter}>
        <div className={styles.box_passageiroInfo}>
          <h3 className={styles.passageiro_faixaEtaria}>Crianças</h3>
          <span className={styles.passageiro_idade}>De 2 a 11 anos</span>
        </div>
        <div className={styles.box_quantidadePassageiro}>
          <button
            className={styles.btn_menos}
            type="button"
            onClick={() => setChildren(children > 0 ? children - 1 : 0)}
            disabled={children === 0}
          >
            <CiCircleMinus />
          </button>
          <span>{children}</span>
          <button
            className={styles.btn_mais}
            type="button"
            onClick={() => setChildren(children + 1)}
            disabled={children >= adults || adults === 0}
          >
            <CiCirclePlus />
          </button>
        </div>
      </div>
      <div className={styles.box_passageiroCounter}>
        <div className={styles.box_passageiroInfo}>
          <h3 className={styles.passageiro_faixaEtaria}>Bebês</h3>
          <span className={styles.passageiro_idade}>2 anos ou menos</span>
        </div>
        <div className={styles.box_quantidadePassageiro}>
          <button
            className={styles.btn_menos}
            type="button"
            onClick={() => setBaby(baby > 0 ? baby - 1 : 0)}
            disabled={baby === 0}
          >
            <CiCircleMinus />
          </button>
          <span>{baby}</span>
          <button
            className={styles.btn_mais}
            onClick={() => setBaby(baby + 1)}
            type="button"
            disabled={baby >= adults || adults === 0}
          >
            <CiCirclePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Passageiros;
