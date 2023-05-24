import express, { Request, Response } from 'express';


import { Microblog } from './microblog';
import { Post } from './post';


const app = express();


const microblog = new Microblog();


app.get('/posts', (req: Request, res: Response) => {
    const posts = microblog.retrieveAll();
    res.json(posts);
});


app.get('/posts/:id', (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const post = microblog.retrieve(postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});


app.delete('/posts/:id', (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const deleted = microblog.delete(postId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Post not found');
    }
});


app.post('/posts', (req: Request, res: Response) => {
    const text = req.body.text;
    const newPost = new Post(getUniqueId(), text, 0);
    microblog.create(newPost);
    res.status(201).json(newPost);
});


app.put('/posts/:id', (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const updatedPost = new Post(postId, req.body.text, req.body.likes);
    const isUpdated = microblog.update(updatedPost);
    if (isUpdated) {
        res.status(200).send();
    } else {
        res.status(404).send('Post not found');
    }
});


app.patch('/posts/:id', (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const updatedFields = req.body;
    const existingPost = microblog.retrieve(postId);
    if (existingPost) {
        const updatedPost = { ...existingPost, ...updatedFields };
        const isUpdated = microblog.update(updatedPost);
        if (isUpdated) {
            res.status(200).send();
        } else {
            res.status(404).send('Post not found');
        }
    } else {
        res.status(404).send('Post not found');
    }
});


app.patch('/posts/:id/like', (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const existingPost = microblog.retrieve(postId);
    if (existingPost) {
        existingPost.likes++;
        const isUpdated = microblog.update(existingPost);
        if (isUpdated) {
            res.status(200).send();
        } else {
            res.status(404).send('Post not found');
        }
    } else {
        res.status(404).send('Post not found');
    }
});


function getUniqueId(): number {
    return Math.floor(Math.random() * 1000) + 1;
}


app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
