import './Promo.css';

const Promo = () => {
  return (
    <section className='promo standart-width-section'>
      <div className='promo__inner'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
        <div className='promo__logo'></div>
        <a className='promo__nav-tab' href='#about-project'>Узнать больше</a>
      </div>
    </section>
  )
};

export default Promo;
