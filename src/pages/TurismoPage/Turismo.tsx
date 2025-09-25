import Header from '../../components/Header/Header';
import Home from '../../components/Home/Home';
import Destinos from '../../components/Destinos/Destinos';
import Depoimentos from '../../components/Depoimentos/Depoimentos';
import Hospedagens from '../../components/Hospedagens/Hospedagens';
import Footer from '../../components/Footer/Footer';

export default function Turismo() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Destinos />
        <Depoimentos />
        <Hospedagens />
      </main>
      <Footer />
    </>
  );
}
