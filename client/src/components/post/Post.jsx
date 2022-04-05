import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={post.photo} alt={post.title} />
      )}
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            {post.categories.map((c) => (
              <Link className="link" to="/posts?cat=Music">
                {c.name}
              </Link>
            ))}
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
