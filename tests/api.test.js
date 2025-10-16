import { expect, test } from  'vitest';
import got from 'got';

const client = got.extend({
    prefixUrl: 'http://localhost:3000',
    responseType: 'json',
    throwHttpErrors: false,
})

test('POST /signup', async () => {
    const res = await client.post('signup', {
        json: {
            email: 'johndoe@gmail.com',
            password: '123456',
        },
        responseType: 'json',
    });

    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.email).toBe('johndoe@gmail.com');
    expect(data).to.not.have.property('password');
})

test('POST /login', async () => {
    const res = await client.post('login', {
        json: {
            email: 'johndoe@gmail.com',
            password: '123456',
        },
        responseType: 'json',
    });
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.email).toBe('johndoe@gmail.com');
    expect(data).to.not.have.property('password');
})

test('POST /posts', async () => {
    const res = await client.post('posts', {
        json: {
            title: 'John doe',
            content: 'John doe is a business developer',
            authorId: 1,
        },
        responseType: 'json',
    });
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.title).toBe('John doe');
    expect(data.content).toBe('John doe is a business developer');
    expect(data.authorId).to.have(1);
})
