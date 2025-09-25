import ModalDados from '../../ModalDados/ModalDados';
import ModalPacote from '../../ModalPacote/ModalPacote';
import ModalSucess from '../../ModalSucess/ModalSucess';
import { ModalsProps } from '../../../types/types';

export default function Modals({
  modalDadosInpts,
  setModalDadosInpts,
  modalDadosErro,
  setModalDadosErro,
  modalCheckLogin,
  setModalCheckLogin,
  modalPacote,
  setModalPacote,
  modalSucess,
  setModalSucess,
  flightData,
  buyFlight,
}: ModalsProps) {
  return (
    <>
      {modalDadosInpts && (
        <ModalDados
          text="Preencher todos os campos do pacote"
          onClose={() => setModalDadosInpts(false)}
        />
      )}

      {modalDadosErro && (
        <ModalDados
          text="Não encontramos Pacotes :("
          onClose={() => setModalDadosErro(false)}
        />
      )}

      {modalCheckLogin && (
        <ModalDados
          text="Login necessário para buscar pacotes"
          onClose={() => setModalCheckLogin(false)}
          linkNavigate={true}
        />
      )}

      {modalPacote && flightData && (
        <ModalPacote
          data={flightData}
          buyFlight={buyFlight}
          onClose={() => setModalPacote(false)}
        />
      )}

      {modalSucess && <ModalSucess onClose={() => setModalSucess(false)} />}
    </>
  );
}
