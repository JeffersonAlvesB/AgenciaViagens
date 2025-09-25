import dayjs from 'dayjs';

/*---- TIPO PARA IMAGEM RETORNADA PELA API. COMPONENTE: DESTINOS ----*/
export type Img = {
  id: number;
  url: string;
};

/*---- TIPO PARA REVIEWS RETORNADA PELA API. COMPONENTE: DEPOIMENTOS ----*/
export type Reviews = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  destination: string;
  img: string;
};
/*---- TIPO PARA IMAGENS DE HOTEIS RETORNADA PELA API. COMPONENTE: HOSPEDAGENS ----*/
export type ImgHotel = {
  id: number;
  name: string;
  url: string;
  category: string;
};

/*---- TIPO PARA SUGESTÕES DE AEROPORTOS RETORNADA PELA API. COMPONENTE: SUGESTOES ----*/
export type Aeroports = {
  iata: string;
  name: string;
  country: string;
  state: string;
  city: string;
};

/*---- TIPO PARA PASSAGEIROS ----*/
export type PassengerData = {
  adults: number;
  children: number;
  baby: number;
};

/*---- TIPO PARA DADOS DE FORMULÁRIO BUSCAR PACOTES ----*/
export type SearchParams = {
  origin: string;
  destination: string;
  departureDate: dayjs.Dayjs | null;
  returnDate: dayjs.Dayjs | null;
  passengers: PassengerData;
};

/*---- TIPO PARA DADOS DO COMPONENTE MODALS ----*/
export type ModalsProps = {
  modalDadosInpts: boolean;
  setModalDadosInpts: React.Dispatch<React.SetStateAction<boolean>>;
  modalDadosErro: boolean;
  setModalDadosErro: React.Dispatch<React.SetStateAction<boolean>>;
  modalCheckLogin: boolean;
  setModalCheckLogin: React.Dispatch<React.SetStateAction<boolean>>;
  modalPacote: boolean;
  setModalPacote: React.Dispatch<React.SetStateAction<boolean>>;
  modalSucess: boolean;
  setModalSucess: React.Dispatch<React.SetStateAction<boolean>>;
  flightData: any;
  buyFlight: () => void;
};

/*---- TIPO PARA VALORES DE INPUTS DA STORE USEREGISTER ----*/
export type CadastroState = {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
  imgUser: string;
  isUserLogin: boolean;
  setFullName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  setImgUser: (value: string) => void;
  setIsUserLogin: (value: boolean) => void;
};

/*---- TIPO PARA VALORES DE INPUTS DA STORE USEPACOTESTORE ----*/
export type PacoteComprado = {
  id: string;
  destino: string;
  dataIda: string;
  horaIda: string;
  dataVolta: string;
  dataCompra: string;
};

export type PacotesState = {
  pacotesComprados: PacoteComprado[];
  adicionarPacote: (pacote: Omit<PacoteComprado, 'id' | 'dataCompra'>) => void;
};
