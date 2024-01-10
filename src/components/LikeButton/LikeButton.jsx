import "./LikeButton.css";

function LikeButton({ isLiked = false, ...restProps }) {
  return (
    <button
      type="button"
      className={`like-btn ${isLiked ? "like-btn_liked" : ""}`}
      {...restProps}
    />
  );
}

export default LikeButton;
