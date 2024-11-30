export const authSwaggerDocs = {
  signup: {
    summary: '회원가입 API',
    description: '사용자 정보를 받아 새로운 계정을 생성합니다.',
    requestBody: {
      description: '회원가입 요청 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            userId: 'testUser123',
            password: 'password123!',
          },
        },
      },
    },
    responses: {
      201: {
        description: '회원가입 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 201,
              result: {
                userId: 'testUser123',
              },
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: '~가 존재하지 않습니다',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      409: {
        description: '중복된 사용자 ID',
        content: {
          'application/json': {
            example: {
              message: 'Existing userId',
              error: 'Conflict',
              statusCode: 409,
            },
          },
        },
      },
      500: {
        description: '회원가입 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'Signup failed',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  signin: {
    summary: '로그인 API',
    description: '사용자의 ID와 비밀번호를 검증하여 JWT 토큰을 반환합니다.',
    requestBody: {
      description: '로그인 요청 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            userId: 'testUser123',
            password: 'password123!',
          },
        },
      },
    },
    responses: {
      200: {
        description: '로그인 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: {
                accessToken: 'some.jwt.token',
              },
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: '~가 존재하지 않습니다',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: '잘못된 자격 증명 (Unauthorized)',
        content: {
          'application/json': {
            example: {
              message: 'Invalid credentials',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
      500: {
        description: '로그인 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'SignIn failed',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
};
