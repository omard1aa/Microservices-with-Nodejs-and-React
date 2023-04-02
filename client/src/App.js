import PostCreate from "./PostCreate";
import PostsList from "./PostsList";

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <div>
        <h1>Your posts</h1>
        <PostsList url={"http://localhost:4000/posts"} />
      </div>
    </div>
  );
};

export default App;
