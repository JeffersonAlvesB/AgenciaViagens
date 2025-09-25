import { useCallback } from 'react';
import axios from 'axios';
import { SearchParams } from '../types/types';

export function useFlightSearch() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_ACCESS_TOKEN;

  const getAccessToken = useCallback(async (): Promise<string> => {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  }, [clientId, clientSecret]);

  const buscarVoos = useCallback(
    async ({
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
    }: SearchParams) => {
      try {
        const token = await getAccessToken();

        const params = new URLSearchParams({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate!.format('YYYY-MM-DD'),
          returnDate: returnDate!.format('YYYY-MM-DD'),
          adults: passengers.adults.toString(),
        });

        const response = await axios.get(
          `https://test.api.amadeus.com/v2/shopping/flight-offers?${params.toString()}&currencyCode=BRL`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          switch (status) {
            case 400:
              console.log(
                '%c→ Erro ao procurar pacotes. Verifique se os dados do inputs estam corretos. ;)',
                'color: orange;'
              );
              break;
            case 404:
              console.log('%c→ Recurso não encontrado. :/', 'color: orange;');
              break;
            case 500:
              console.log(
                '%c→ Erro interno em nosso serviço. Tente novamente mais tarde ;)',
                'color: orange;'
              );
              break;
            default:
              console.log(
                '%c→ Erro Desconhecido. Tente novamente mais tarde ;).',
                'color: orange;'
              );
          }
          return;
        }
      }
    },
    [getAccessToken]
  );

  return { buscarVoos };
}
