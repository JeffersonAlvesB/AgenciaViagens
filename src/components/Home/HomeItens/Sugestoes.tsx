import styles from './Sugestoes.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Aeroports } from '../../../types/types';

type SugestoesProps = {
  destino: string;
  onSelect: (valor: string) => void;
};

export default function Sugestoes({ destino, onSelect }: SugestoesProps) {
  /*---- ESTADO DOS AEROPORTOS ----*/
  const [airports, setAirports] = useState<Aeroports[]>([]);

  /*---- BUSCA DOS AEROPORTOS NA API ----*/
  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const response = await axios.get('/aeroportos.json');
        setAirports(response.data);
      } catch (error) {
        console.error('Erro ao carregar os aeroportos:', error);
      }
    };
    getSuggestions();
  }, []);

  /*---- NORMALIZAÇÃO DO TEXTO PARA PESQUISA ----*/
  const normalizeText = (text: string): string => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  };

  /*---- RESULTADOS FILTRODOS DE AEROPORTOS ----*/
  const resultadosFiltrados: Aeroports[] = airports.filter((info) => {
    const textComplete = `${info.country} ${info.city} ${info.name} ${info.iata}`;
    return normalizeText(textComplete).includes(normalizeText(destino));
  });

  return (
    <ul className={styles.container_sugestoes}>
      {resultadosFiltrados.length > 0 ? (
        resultadosFiltrados.map((info, index) => {
          return (
            <li
              className={styles.sugestoes}
              key={index}
              onClick={() => onSelect(info.iata)}
            >
              {info.country} - {info.city} - {info.name} - {info.iata}
            </li>
          );
        })
      ) : (
        <li className={styles.sugestao_errada}>
          Nenhum aeroporto encontrado para "{destino}"
        </li>
      )}
    </ul>
  );
}
