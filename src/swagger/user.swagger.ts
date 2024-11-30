export const userSwaggerDocs = {
  saveUserCase: {
    summary: '사용자 케이스 저장',
    description: '사용자의 UUID와 케이스 ID를 기반으로 케이스를 저장합니다.',
    requestBody: {
      description: '사용자 케이스 저장 요청 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            caseId: 'case_1',
          },
        },
      },
    },
    responses: {
      200: {
        description: '케이스 저장 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Bad Requset',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: '인증 실패',
        content: {
          'application/json': {
            example: {
              message: 'Unauthorized',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
      404: {
        description: '사용자를 찾을 수 없음',
        content: {
          'application/json': {
            example: {
              message: 'User not found for update',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '내부 서버 오류',
        content: {
          'application/json': {
            example: {
              message: 'Failed to save user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  getUserCase: {
    summary: '사용자 케이스 조회',
    description: '사용자의 UUID를 기반으로 케이스 정보를 조회합니다.',
    responses: {
      200: {
        description: '케이스 조회 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: 'case_1',
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Bad Requset',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: '인증 실패',
        content: {
          'application/json': {
            example: {
              message: 'Unauthorized',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
      404: {
        description: '사용자를 찾을 수 없음',
        content: {
          'application/json': {
            example: {
              message: 'Not Found User',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '내부 서버 오류',
        content: {
          'application/json': {
            example: {
              message: 'Failed to fetch user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  getUserMainQuestion: {
    summary: '사용자의 메인 질문 조회',
    description: '사용자의 UUID를 기반으로 관련된 메인 질문을 조회합니다.',
    responses: {
      200: {
        description: '메인 질문 조회 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: '메인 질문 텍스트',
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Bad Requset',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: '인증 실패',
        content: {
          'application/json': {
            example: {
              message: 'Unauthorized',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
      404: {
        description: '사용자를 찾을 수 없음',
        content: {
          'application/json': {
            example: {
              message: 'Not Found User',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '내부 서버 오류',
        content: {
          'application/json': {
            example: {
              message: 'Failed to fetch user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
};
