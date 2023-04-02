class Comment {
    id: string;
    postId: string;
    content: string
    status: string;

    constructor(id: string, postId: string, content: string, status: string) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.status = status;
    }
}

export default Comment;