import { Sequelize, Model, DataTypes, HasMany } from 'sequelize';


const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'postgres',
    host: 'localhost',
});


class Post extends Model {
    public id!: number;
    public text!: string;
    public likes!: number;


    public readonly comments?: Comment[];


    public static associations: {
        comments: HasMany<Post, Comment>;
    };
}


Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'post',
    }
);


class Comment extends Model {
    public id!: number;
    public text!: string;


    public postId!: number;
}


Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'comment',
    }
);


Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });


class MicroblogPersistente {
    async createPost(post: { text: string; likes: number }): Promise<Post> {
        return await Post.create(post);
    }


    async createComment(postId: number, comment: { text: string }): Promise<Comment> {
        return await Comment.create({ postId, ...comment });
    }


    async retrievePost(id: number): Promise<Post | null> {
        return await Post.findByPk(id, { include: Comment });
    }


    async retrieveAllPosts(): Promise<Post[]> {
        return await Post.findAll({ include: Comment });
    }


    async retrieveCommentsByPostId(postId: number): Promise<Comment[]> {
        return await Comment.findAll({ where: { postId } });
    }


    async updatePost(id: number, post: { text?: string; likes?: number }): Promise<boolean> {
        const updatedRows = await Post.update(post, { where: { id } });
        return updatedRows[0] > 0;
    }


    async deletePost(id: number): Promise<boolean> {
        const deletedRows = await Post.destroy({ where: { id } });
        return deletedRows > 0;
    }
}


export default MicroblogPersistente;