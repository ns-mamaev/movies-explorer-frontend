import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = () => {
  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        <MoviesCard title='33 слова о дизайне'/>
      </ul>
      <button type='button'>Ещё</button>
    </section>
  );
};

export default MoviesCardList;
