class Post {
  id: number;
  text: string;
  likes: number;

  constructor(id: number, text: string, likes: number) {
    this.id = id;
    this.text = text;
    this.likes = likes;
  }
}


const myPost = new Post(1, "Hello, world!", 10);
console.log(myPost.id);
console.log(myPost.text);
console.log(myPost.likes);