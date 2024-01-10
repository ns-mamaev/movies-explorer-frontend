import { cn } from '../../utills/utills';
import './MovieCardSkeleton.css';

function MovieCardSkeleton({ className }) {
  return <div className={cn('card-skeleton', {}, [className])}/>;
}

export default MovieCardSkeleton;
