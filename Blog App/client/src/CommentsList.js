import React from "react";

const CommentsList = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchComments = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const commentsList = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{commentsList}</ul>;
};

export default CommentsList;
