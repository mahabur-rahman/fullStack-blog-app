import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getSinglePost = async () => {
      const res = await axios.get("/posts/" + path);
      // console.log(res);
      setSinglePost(res.data);
    };

    getSinglePost();
  }, [path]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {singlePost && (
          <img className="singlePostImg" src={singlePost.photo} alt="" />
        )}
        <h1 className="singlePostTitle">
          {singlePost.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${singlePost.username}`}>
                {singlePost.username}
              </Link>
            </b>
          </span>
          <span>{new Date(singlePost.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{singlePost.desc}</p>
      </div>
    </div>
  );
}
