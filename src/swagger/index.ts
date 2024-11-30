import { authSwaggerDocs } from './auth.swagger';
import { chatGptSwaggerDocs } from './chatgpt.swagger';
import { userSwaggerDocs } from './user.swagger';
import { myProfileSwaggerDocs } from './myprofile.swagger';
import { postSwaggerDocs } from './posts.swagger';

export const swaggerDocs = {
  paths: {
    // 유저 
    '/user/case': {
      post: {
        ...userSwaggerDocs.saveUserCase,
        tags: ['User'],
      },
      get: {
        ...userSwaggerDocs.getUserCase,
        tags: ['User'],
      }
    },
    '/user/question': {
      get: {
        ...userSwaggerDocs.getUserMainQuestion,
        tags: ['User'],
      }
    },

    // 인증 
    '/auth/signup': {
      post: {
        ...authSwaggerDocs.signup,
        tags: ['Auth'], 
      },
    },
    '/auth/signin': {
      post: {
        ...authSwaggerDocs.signin,
        tags: ['Auth'], 
      },
    },

    // Chat GPT 
    '/chatgpt/makeCase': {
      post: {
        ...chatGptSwaggerDocs.makeCase,
        tags: ['ChatGPT'],
      },
    },
    '/chatgpt/makeReQuestion': {
      post: {
        ...chatGptSwaggerDocs.makeReQuestion,
        tags: ['ChatGPT'],
      },
    },
    '/chatgpt/combine': {
      post: {
        ...chatGptSwaggerDocs.combine,
        tags: ['ChatGPT'],
      },
    },

    // MyProfile
    '/myprofile/{caseId}': {
      get: {
        ...myProfileSwaggerDocs.getMainQuestion,
        tags: ['MyProfile'], // 태그 추가
      },
    },

    // Post
    '/post': {
      post: {
        ...postSwaggerDocs.savePost,
        tags: ['Post'],
      },
      patch: {
        ...postSwaggerDocs.patchPost,
        tags: ['Post'],
      },
    },
    '/post/check': {
      get: {
        ...postSwaggerDocs.checkExistPostData,
        tags: ['Post'], 
      },
    },
    '/post/check/{mainId}': {
      get: {
        ...postSwaggerDocs.checkExistPostDataByMainId,
        tags: ['Post'],
      },
    },
    '/post/{mainId}/{subId}': {
      get: {
        ...postSwaggerDocs.getPost,
        tags: ['Post'],
      },
    },
  },
  tags: [
    {
      name: 'Auth',
    },
    {
      name: 'ChatGPT',
    },
    {
      name: 'User',
    },
    {
      name: 'Post',
    },
    {
      name: 'MyProfile',
    }
  ],
};
