import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import sampleImage from '../../images/movie_poster_1.jpg';

const MoviesCardList = () => {
  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>
        <MoviesCard title='33 слова о дизайне' imageSource={sampleImage}/>
        <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked'/>
        <MoviesCard title='33 слова о дизайне' imageSource={sampleImage}/>
        <MoviesCard title='33 слова о дизайне' imageSource={sampleImage}/>
        <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked'/>
      </ul>
      <button type='button'>Ещё</button>
    </section>
  );
};

export default MoviesCardList;
