import Post from './Post';
import Comment from './Comment';

class PostComments {
    Post: Post;
    Comments: Comment[];

    constructor(Post: Post, Comments: Comment[]) {
        this.Post = Post;
        this.Comments = Comments;
    }
}

export default PostComments;