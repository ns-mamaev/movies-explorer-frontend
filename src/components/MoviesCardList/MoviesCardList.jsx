import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import sampleImage from '../../images/movie_poster_1.jpg';

const MoviesCardList = ({ movies }) => {
  const moviesComponents = movies.map(({
    nameRU,
    duration,
    trailerLink,
    image: { url }
  }) => (
    <MoviesCard
      title={nameRU}
      imageSource={`https://api.nomoreparties.co/${url}`}
      duration={duration}
      trailerLink={trailerLink}
    />
  ));

  return (
    <ul className='movies-cards'>
      {moviesComponents}
    </ul>
  );
};

{/* <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
<MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='remove' />
<MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
<MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />*/}

export default MoviesCardList;
