import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostsList = (props) => {
  const [postsComments, setPostsComments] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    console.log(res.data);
    setPostsComments(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const postsList = postsComments.map((postComment) => {
    return (
      <li key={postComment.Post.id}>
        <h3>{postComment.Post.title}</h3>
        <div className="col-sm-4">
          <CommentCreate postId={postComment.Post.id} />
          <CommentsList comments={postComment.Comments} />
        </div>
        <hr />
      </li>
    );
  });

  return (
    <div>
      <ul>{postsList}</ul>
      <div></div>
    </div>
  );
};

export default PostsList;
