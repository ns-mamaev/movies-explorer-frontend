import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import sampleImage from '../../images/movie_poster_1.jpg';

const MoviesCardList = () => {
  return (
    <ul className='movies-cards'>
      {/* карточки пока  статичные модификатор кнопки будет определяться в дальнейшем через пропсы
      в зависимости от того, на экране ли мы своих фильмов - будет только 'remove', сохранен ли фильм у нас -
      будет "liked'*/}
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='remove'/>
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='remove'/>
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='remove'/>
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} />
      <MoviesCard title='33 слова о дизайне' imageSource={sampleImage} buttonType='liked' />
    </ul>
  );
};

export default MoviesCardList;
