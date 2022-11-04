import SectionHeading from '../SectionHeading/SectionHeading';
import './AboutMe.css';
import avatar from '../../images/photo.jpg'

const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className='about-me__inner'>
        <SectionHeading title='Студент' />
        <article className='about-me__bio'>
          <div className='about-me__bio-text-wrapper'>
            <h3 className='about-me__name'>Никита</h3>
            <p className='about-me__profession'>Фронтенд-разработчик, 28 лет</p>
            <p className='about-me__text'>
              Родился и&nbsp;живу в&nbsp;г.Йошкар-Ола, имею магистерскую степень по&nbsp;экономике и&nbsp;большую часть жизни проработал в&nbsp;сфере экономического анализа и&nbsp;бизнес-планирования. У&nbsp;меня есть прекрасная жена. Люблю путешествия в&nbsp;дикую природу и&nbsp;забеги на&nbsp;длинные дистанции. С&nbsp;конца 2021 года начал серьезно увлекаться программированием. А&nbsp;в&nbsp;2022 году прошел большой курс по&nbsp;веб-разработке с&nbsp;код-ревью и&nbsp;бесконечными проектными работами.
            </p>
          </div>
            <a className='about-me__link' href='https://github.com/ns-mamaev' target='_blank'>
              Github
            </a>
          <img src={avatar} alt='мой портрет' className='about-me__photo' />
        </article>
      </div>
    </section>
  )
};

export default AboutMe;
