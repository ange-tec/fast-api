export const createPostDto = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string'},
        content: { type: 'string' },
    },
    required: ['title', 'content'],
  },
  response: {
    200: {
      type:'object',
      properties :{
        id: { type: 'number'},
        title : { type: 'string'},
          content: { type: 'string' },
          authorId: { type: 'number'},
          author: { type: "object", properties: { email: { type: 'string' } } },
      },
      required: ['id', 'title', 'content', 'authorId'],
    }
  }
};


export const GetPostsDto = {
  queryString: {
    type: 'object',
    properties: {
      page: { type: 'number'},
      limit: { type: 'number'},
    }
  },
  response: {
    200: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                title: {type: 'string'},
                content: {type: 'string'},
            },
            required: ['id', 'title', 'content']
        }
    }
  }
};

export const GetPostByIdDto = {
    queryString: {
        type: 'object',
        properties: {
            id: { type: 'number'},
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number'},
                title: { type: 'string'},
                content: { type: 'string'},
            },
            required: ['id', 'title', 'content']
        }
    }
}

export const UpdatePostDto = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string'},
            content: { type: 'string' },
        },
        required: ['title', 'content'],
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'},
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                title: {type: 'string'},
                content: {type: 'string'},
            },
            required: ['id', 'title', 'content']
        }
    }
}

export const DeletePostDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'},
        }
    },
    required: ['id'],
    response: {
        200: {
            type: 'array',
            properties: {
                id: {type: 'number'},
                title: {type: 'string'},
                content: {type: 'string'},
            }
        }
    }
}

export  const LoginDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string'},
            password: { type: 'string'},
        },
        required: ['email', 'password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number'},
                email: {type: 'string'},
                token: { type: 'string'},
            }
        }
    }
}

export const SignUpDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string'},
            password: { type: 'string'},
        },
        required: ['email', 'password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number'},
                email: { type: 'string'},
            }
        }
    }
}

export const createdCategoryDto = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string'},
        },
        required: ['name'],
    },
    response: {
        200: {
            type:'object',
            properties :{
                id: { type: 'number'},
                name : { type: 'string'},
            },
            required: ['id', 'name']
        }
    }
};
