import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import sampleImage from '../../images/movie_poster_1.jpg';

const MoviesCardList = ({ movies, onSaveMovie, onRemoveMovie }) => {
  const moviesComponents = movies.map(({
    movieId,
    nameRU,
    duration,
    trailerLink,
    image,
    type,
    _id: id,
  }) => (
    <MoviesCard
      title={nameRU}
      imageSource={image}
      duration={duration}
      trailerLink={trailerLink}
      onSaveMovie={onSaveMovie}
      onRemoveMovie={onRemoveMovie}
      movieId={movieId}
      key={movieId}
      type={type}
      id={id}
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
