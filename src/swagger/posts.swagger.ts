export const postSwaggerDocs = {
  savePost: {
    summary: '자서전 데이터 저장',
    description: '사용자의 자서전 데이터를 저장합니다.',
    requestBody: {
      description: '자서전 데이터 저장 요청',
      required: true,
      content: {
        'application/json': {
          example: {
            data: '당신의 소중한 추억에 대한 답변입니다.',
            question: '당신의 가장 소중한 추억은?',
            mainId: 1,
            subId: 1,
          },
        },
      },
    },
    responses: {
      200: {
        description: '자서전 데이터 저장 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: null,
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
      500: {
        description: '자서전 데이터 저장 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'Failed to save autobiography data',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  patchPost: {
    summary: '자서전 데이터 수정',
    description: '저장된 자서전 데이터를 수정합니다.',
    requestBody: {
      description: '자서전 데이터 수정 요청',
      required: true,
      content: {
        'application/json': {
          example: {
            data: '수정된 답변입니다.',
            mainId: 1,
            subId: 1,
          },
        },
      },
    },
    responses: {
      200: {
        description: '자서전 데이터 수정 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: null,
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
        description: '수정할 자서전 데이터를 찾을 수 없음',
        content: {
          'application/json': {
            example: {
              message: 'Autobiography data not found for update',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '자서전 데이터 수정 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'Failed to update autobiography data',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  checkExistPostData: {
    summary: '자서전 데이터 존재 여부 확인',
    description: '사용자의 자서전 데이터가 존재하는지 확인합니다.',
    responses: {
      200: {
        description: '자서전 데이터 존재 여부 확인 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: true,
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Invalid request format',
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
      500: {
        description: '자서전 데이터 존재 여부 확인 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'Failed to check autobiography data existence',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  checkExistPostDataByMainId: {
    summary: '특정 MainId로 자서전 데이터 존재 여부 확인',
    description: '주어진 MainId에 해당하는 자서전 데이터가 존재하는지 확인합니다.',
    parameters: [
      {
        name: 'mainId',
        in: 'path',
        required: true,
        description: '확인할 MainId',
        schema: {
          type: 'number',
          example: 1,
        },
      },
    ],
    responses: {
      200: {
        description: '자서전 데이터 존재 여부 확인 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: true,
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Invalid request format',
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
      500: {
        description: '자서전 데이터 존재 여부 확인 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'Failed to check autobiography data existence by mainId',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  getPost: {
    summary: '자서전 데이터 조회',
    description: '주어진 MainId와 SubId에 해당하는 자서전 데이터를 조회합니다.',
    parameters: [
      {
        name: 'mainId',
        in: 'path',
        required: true,
        description: '조회할 MainId',
        schema: {
          type: 'number',
          example: 1,
        },
      },
      {
        name: 'subId',
        in: 'path',
        required: true,
        description: '조회할 SubId',
        schema: {
          type: 'number',
          example: 1,
        },
      },
    ],
    responses: {
      200: {
        description: '자서전 데이터 조회 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: {
                data: '당신의 소중한 추억에 대한 답변입니다.',
                question: '당신의 가장 소중한 추억은?',
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
              message: 'Invalid request format',
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
        description: '자서전 데이터를 찾을 수 없음',
        content: {
          'application/json': {
            example: {
              message: 'Autobiography data not found',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '자서전 데이터 조회 실패 (내부 서버 오류)',
        content: {
          'application/json': {
            example: {
              message: 'Failed to get autobiography data',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
};
