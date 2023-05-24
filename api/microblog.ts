class Microblog {
    posts: Post[];


    constructor() {
        this.posts = [];
    }


    create(post: Post): void {
        this.posts.push(post);
    }


    retrieve(id: number): Post | undefined {
        return this.posts.find((post) => post.id === id);
    }


    update(post: Post): boolean {
        const index = this.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
            this.posts[index] = post;
            return true;
        }
        return false;
    }


    delete(id: number): boolean {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }


    retrieveAll(): Post[] {
        return this.posts;
    }
}


const microblog = new Microblog();


const newPost = new Post(1, "Hello, world!", 10);
microblog.create(newPost);


const retrievedPost = microblog.retrieve(1);
console.log(retrievedPost);


const updatedPost = new Post(1, "Updated post!", 20);
const isUpdated = microblog.update(updatedPost);
console.log(isUpdated);


const isDeleted = microblog.delete(1);
console.log(isDeleted);


const allPosts = microblog.retrieveAll();
console.log(allPosts);