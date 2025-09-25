import { useState } from 'react';

export function usePassengers() {
  /*---- VALORES DOS PASSAGEIROS PACOTE ----*/
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [baby, setBaby] = useState<number>(0);

  /*---- QUANTIDADE TOTAL DE PASSAGEIROS (QUANTOS VÃO) ----*/
  const totalPassengers: number = adults + children + baby;

  return {
    adults,
    setAdults,
    children,
    setChildren,
    baby,
    setBaby,
    totalPassengers,
  };
}
