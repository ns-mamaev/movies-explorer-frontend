import "./LikeButton.css";

function LikeButton({ liked = true }) {
  return (
    <button
      type="button"
      className={`like-btn ${liked ? "like-btn_liked" : ""}`}
    />
  );
}

export default LikeButton;
