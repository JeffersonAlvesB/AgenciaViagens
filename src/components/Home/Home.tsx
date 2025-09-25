// React / Bibliotecas
import { useState, useRef, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

// Hooks
import { usePassengers } from '../../hooks/usePassengers';
import { useFlightSearch } from '../../hooks/useFlightSearch';

// Stores
import { useRegisterStore } from '../../store/useRegisterStore';
import { usePacotesStore } from '../../store/usePacoteStore';

// Estilos e Componentes
import styles from './Home.module.scss';
import Calendario from './HomeItens/Calendario';
import Passageiros from './HomeItens/Passageiros';
import Sugestoes from './HomeItens/Sugestoes';
import Loading from '../Loader/Loading';
import Modals from './ModalHome/Modals';

const Home = () => {
  /*---- ESTADOS DOS MODAIS ----*/
  const [modalSuggestions, setModalSuggestions] = useState<boolean>(false);
  const [modalDataCheckIn, setModalDataCheckIn] = useState<boolean>(false);
  const [modalDataCheckOut, setModalDataCheckOut] = useState<boolean>(false);
  const [modalPassengers, setModalPassengers] = useState<boolean>(false);
  const [modalPacote, setModalPacote] = useState<boolean>(false);
  const [modalDadosInpts, setModalDadosInpts] = useState<boolean>(false);
  const [modalDadosErro, setModalDadosErro] = useState<boolean>(false);
  const [modalCheckLogin, setModalCheckLogin] = useState<boolean>(false);
  const [modalSucess, setModalSucess] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  /*---- ESTADOS DE FORMULÁRIO ----*/
  const [destino, setDestino] = useState<string>('');
  const [selectedDateCheckIn, setSelectedDateCheckIn] = useState<Dayjs | null>(null);
  const [selectedDateCheckOut, setSelectedDateCheckOut] = useState<Dayjs | null>(
    null
  );

  /*---- HOOKS CUSTOMIZADOS ----*/
  const {
    adults,
    setAdults,
    children,
    setChildren,
    baby,
    setBaby,
    totalPassengers,
  } = usePassengers();

  const { isUserLogin } = useRegisterStore();

  /*---- REFS PARA CONTROLE DE MODAIS ----*/
  const checkInRef = useRef<HTMLDivElement | null>(null);
  const checkOutRef = useRef<HTMLDivElement | null>(null);
  const PassengersRef = useRef<HTMLDivElement | null>(null);

  /*---- FUNÇÕES AUXILIARES DE FECHAMENTO E CONFIG ----*/
  const BLUR_DELAY_MS = 200;
  const TWO_SECONDS = 2000;
  const FOUR_SECONDS = 4000;

  const closeModalDadosInpt = () => {
    setTimeout(() => setModalDadosInpts(false), TWO_SECONDS);
  };

  const closeModalDadosErro = () => {
    setTimeout(() => setModalDadosErro(false), TWO_SECONDS);
  };

  const closeModalCheckLogin = () => {
    setTimeout(() => setModalCheckLogin(false), FOUR_SECONDS);
  };

  /*---- FUNÇÕES DE VALIDAÇÃO E LIMPEZA ----*/
  const clearForm = () => {
    setDestino('');
    setAdults(0);
    setChildren(0);
    setBaby(0);
    setSelectedDateCheckIn(null);
    setSelectedDateCheckOut(null);
  };

  const validateInputs = () => {
    if (
      destino === '' ||
      selectedDateCheckIn === null ||
      selectedDateCheckOut === null ||
      totalPassengers === 0
    ) {
      setModalDadosInpts(true);
      closeModalDadosInpt();
      return false;
    }
    return true;
  };

  const checkAuthenticationUser = () => {
    if (!isUserLogin) {
      setModalCheckLogin(true);
      closeModalCheckLogin();
      return false;
    }
    return true;
  };

  /*---- HANDLERS DE EVENTOS ----*/
  const flightSuggestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestino(e.target.value);
    setModalSuggestions(true);
  };

  const handleSelectSuggestion = (valor: string) => {
    setDestino(valor);
    setModalSuggestions(false);
  };

  const handleDateSelectCheckIn = (date: Dayjs): void => {
    setSelectedDateCheckIn(date);
    setModalDataCheckIn(false);

    if (!selectedDateCheckOut || date.isSameOrAfter(selectedDateCheckOut, 'day')) {
      setSelectedDateCheckOut(date.add(1, 'day'));
    }
  };

  const handleDateSelectCheckOut = (date: Dayjs): void => {
    setSelectedDateCheckOut(date);
    setModalDataCheckOut(false);
  };

  const showModalPassengers = () => setModalPassengers(true);

  /*---- BUSCA E COMPRA DE VOOS ----*/
  const { buscarVoos } = useFlightSearch();
  const [flightData, setFlightData] = useState<any>(null);
  const { adicionarPacote } = usePacotesStore();

  const showModalPacote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkAuthenticationUser()) return;

    setLoader(true);

    await new Promise((resolve) => setTimeout(resolve, TWO_SECONDS));

    if (!validateInputs()) {
      setLoader(false);
      return;
    }

    const voos = await buscarVoos({
      origin: 'SDU',
      destination: destino,
      departureDate: selectedDateCheckIn,
      returnDate: selectedDateCheckOut,
      passengers: { adults, children, baby },
    });

    if (!voos || !voos.data || voos.data.length === 0 || !destino) {
      setModalDadosErro(true);
      setLoader(false);
      closeModalDadosErro();
      return;
    }

    const selectedFlights = voos.data[0];

    const flightDataToSave = {
      ...selectedFlights,
      savedDestino: destino,
      savedDateCheckIn: selectedDateCheckIn,
      savedDateCheckOut: selectedDateCheckOut,
    };

    clearForm();

    setFlightData(flightDataToSave);
    setLoader(false);
    setModalPacote(true);
  };

  const handleBuyFlight = () => {
    if (flightData) {
      buyFlight(flightData);
    }
  };

  const buyFlight = async (voo: any) => {
    const checkInDate = voo.savedDateCheckIn;
    const checkOutDate = voo.savedDateCheckOut;
    const destinoSalvo = voo.savedDestino;

    setModalPacote(false);
    setLoader(true);

    const randomTime = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    setTimeout(() => {
      if (voo && checkInDate && checkOutDate && destinoSalvo) {
        const segments = voo.itineraries[0].segments;
        const firstSegment = segments[0];

        adicionarPacote({
          destino: destinoSalvo,
          dataIda: checkInDate.format('DD/MM'),
          horaIda: dayjs(firstSegment.departure.at).format('HH:mm'),
          dataVolta: checkOutDate.format('DD/MM'),
        });
      }

      setLoader(false);
      setModalSucess(true);
    }, randomTime);
  };

  /*---- EFFECTS - CONTROLE DE CLIQUES EXTERNOS ----*/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (checkInRef.current && !checkInRef.current.contains(event.target as Node)) {
        setModalDataCheckIn(false);
      }
      if (
        checkOutRef.current &&
        !checkOutRef.current.contains(event.target as Node)
      ) {
        setModalDataCheckOut(false);
      }
      if (
        PassengersRef.current &&
        !PassengersRef.current.contains(event.target as Node)
      ) {
        setModalPassengers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <section id="Home" className={styles.container_home}>
        <div className={styles.container_widthHome}>
          <div className={styles.box_tituloTexto}>
            <h1 className={styles.titulo}>
              Oferecemos os melhores pacotes de viagem para suas férias!
            </h1>
            <p className={styles.texto_info}>
              A Thynk Travel, do Rio de Janeiro, oferece serviços personalizados para
              quem busca destinos incríveis. Com nossos pacotes de viagem, você terá
              uma experiência única, linda e inesquecível. Realize seus sonhos de
              viajar conosco! Saímos do Aeroporto Santos Dumont, o principal ponto de
              partida para suas aventuras no Brasil e no mundo.
            </p>
          </div>
          <div className={styles.container_pesquisaPacotes}>
            <div className={styles.box_produto}>
              <span className={styles.categoria_produtos}>Destino</span>
            </div>
            <form onSubmit={showModalPacote} className={styles.container_pacotes}>
              <div className={styles.box_pacote}>
                <span className={styles.info_pacote}>Localização</span>
                <div className={styles.input_container}>
                  <input
                    className={styles.input_pacote}
                    type="text"
                    placeholder="Vai para onde?"
                    value={destino}
                    onChange={flightSuggestions}
                    onFocus={() => setModalSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => {
                        setModalSuggestions(false);
                      }, BLUR_DELAY_MS)
                    }
                  />
                  {modalSuggestions && (
                    <div className={styles.container_suggestions}>
                      <Sugestoes
                        destino={destino}
                        onSelect={handleSelectSuggestion}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.box_pacote} ref={PassengersRef}>
                <span className={styles.info_pacote}>Nº de Passageiros</span>
                <div className={styles.input_container_passengers}>
                  {modalPassengers && (
                    <div className={styles.container_passengers}>
                      <Passageiros
                        adults={adults}
                        setAdults={setAdults}
                        children={children}
                        setChildren={setChildren}
                        baby={baby}
                        setBaby={setBaby}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={showModalPassengers}
                    className={styles.input_pacote}
                  >
                    {totalPassengers > 0
                      ? `${totalPassengers} viajante(s)`
                      : 'Passageiros'}
                  </button>
                  <i
                    onClick={showModalPassengers}
                    className="bi bi-arrow-up-circle-fill"
                  ></i>
                </div>
              </div>
              <div className={styles.box_pacote} ref={checkInRef}>
                <span className={styles.info_pacote}>Check-in</span>
                <div className={styles.input_container_calendario1}>
                  {modalDataCheckIn && (
                    <div className={styles.container_calendario1}>
                      <Calendario
                        onDateSelect={handleDateSelectCheckIn}
                        selectedDate={selectedDateCheckIn}
                      />
                    </div>
                  )}
                  <input
                    onFocus={() => setModalDataCheckIn(true)}
                    className={styles.input_pacote}
                    type="text"
                    placeholder="Selecione"
                    value={
                      selectedDateCheckIn
                        ? selectedDateCheckIn.format('DD/MM/YYYY')
                        : ''
                    }
                    readOnly
                  />
                  <i
                    onClick={() => setModalDataCheckIn(true)}
                    className="bi bi-arrow-up-circle-fill"
                  ></i>
                </div>
              </div>
              <div className={styles.box_pacote} ref={checkOutRef}>
                <span className={styles.info_pacote}>Check-Out</span>
                <div className={styles.input_container_calendario2}>
                  {modalDataCheckOut && (
                    <div className={styles.container_calendario2}>
                      <Calendario
                        onDateSelect={handleDateSelectCheckOut}
                        selectedDate={selectedDateCheckOut}
                        minDate={
                          selectedDateCheckIn && selectedDateCheckIn.add(1, 'day')
                        }
                      />
                    </div>
                  )}
                  <input
                    onFocus={() => setModalDataCheckOut(true)}
                    className={styles.input_pacote}
                    type="text"
                    placeholder="Selecione"
                    value={
                      selectedDateCheckOut
                        ? selectedDateCheckOut.format('DD/MM/YYYY')
                        : ''
                    }
                    readOnly
                  />
                  <i
                    onClick={() => setModalDataCheckOut(true)}
                    className="bi bi-arrow-up-circle-fill"
                  ></i>
                </div>
              </div>
              <button type="submit" className={styles.submit_pacote}>
                <i className="bi bi-search"></i>
                Buscar
              </button>
            </form>
          </div>
        </div>
      </section>

      <Modals
        modalDadosInpts={modalDadosInpts}
        setModalDadosInpts={setModalDadosInpts}
        modalDadosErro={modalDadosErro}
        setModalDadosErro={setModalDadosErro}
        modalCheckLogin={modalCheckLogin}
        setModalCheckLogin={setModalCheckLogin}
        modalPacote={modalPacote}
        setModalPacote={setModalPacote}
        modalSucess={modalSucess}
        setModalSucess={setModalSucess}
        flightData={flightData}
        buyFlight={handleBuyFlight}
      />

      {loader && <Loading />}
    </>
  );
};
export default Home;
