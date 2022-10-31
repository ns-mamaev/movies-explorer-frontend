import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css'

const Main = () => {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
};

export default Main;
