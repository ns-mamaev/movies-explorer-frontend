import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import sampleImage from '../../images/movie_poster_1.jpg';

const MoviesCardList = () => {
  return (
    <ul className='movies-cards'>
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
    </ul>
  );
};

export default MoviesCardList;
