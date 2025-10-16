
const posts = [
  {
    id: 1,
    title: 'Hello world',
    content: 'This is a post about Hello world.'
  },
];

export const PostRepository = {
  // getPosts: async (page, limit) => {
  //   const start = (page -1) * limit;
  //   const end = page * limit;
  //   return posts.slice(start, end);
  // }

  getPost: async (id) => {
    const post = posts.find(post => post.id === id);
    if(!post) {
      throw new Error('Post not found');
    }
    return post;
  },

  createPost: async (post) => {
    const id = posts.length + 1;
    const newPost = {id, ...post};
    posts.push(newPost);
    return newPost;
  },

  updatePost: async (id, post) => {
    const index = posts.find(post => post.id === id);
    const oldPost = posts[index];
    if(!oldPost) {
      throw new Error('Post not found');
    }
    const newPost = {id, ...oldPost, ...post};
    posts[index] = newPost;
    return newPost;
  },

  deletePost: async (id) => {
    const index = posts.findIndex(post => post.id === id);
    if(index === -1) {
      throw new Error('Post not found');
    }
    const deleted = posts.splice(index, 1);
    return deleted;
  }
};

const users = [
  {
    id: 1,
    email: 'test@gmail.com',
    password: 'test'
  },
];

export const UserRepository = {
  getUser: async (id) => {
    const user = users.find(user => user.id === id);
    if(!user) {
      throw new Error('Post not found');
    }
    return user;
  },
    createUser: async (user) => {
    const id = users.length + 1;
    const newUser = {id, ...user};
    users.push(newUser);
    return newUser;

  },
} 