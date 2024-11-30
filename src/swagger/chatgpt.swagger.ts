export const chatGptSwaggerDocs = {
  makeCase: {
    summary: '사용자별 맞춤형 Case 구분',
    description: 'ChatGPT를 활용하여 사용자별 맞춤형 Case를 사용자 자기소개 데이터를 통해 구분합니다.',
    requestBody: {
      description: '사용자 자기소개 데이터 요청',
      required: true,
      content: {
        'application/json': {
          example: {
            data: '사용자 자기소개 데이터',
          },
        },
      },
    },
    responses: {
      200: {
        description: '사용자별 맞춤형 Case 구분 완료',
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
              message: '데이터가 존재하지 않습니다',
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
        description: 'ChatGPT API 호출 실패',
        content: {
          'application/json': {
            example: {
              message: 'ChatGPT API ERROR',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  makeReQuestion: {
    summary: '추가 질문 생성',
    description: 'ChatGPT를 활용하여 추가 질문을 생성합니다.',
    requestBody: {
      description: '추가 질문 생성 요청 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            question: '기존 질문',
            data: '사용자 답변',
          },
        },
      },
    },
    responses: {
      200: {
        description: '추가 질문 생성 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: '생성된 추가 질문 텍스트',
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: '질문 또는 데이터가 존재하지 않습니다',
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
        description: 'ChatGPT API 호출 실패',
        content: {
          'application/json': {
            example: {
              message: 'ChatGPT API ERROR',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  combine: {
    summary: '질문 및 데이터 결합',
    description: 'ChatGPT를 활용하여 두 질문과 데이터를 결합합니다.',
    requestBody: {
      description: '질문 및 데이터 결합 요청 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            question1: '첫 번째 질문',
            question2: '두 번째 질문',
            data1: '첫 번째 질문에 대한 답변',
            data2: '두 번째 질문에 대한 답변',
          },
        },
      },
    },
    responses: {
      200: {
        description: '결합 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: '결합된 결과 텍스트',
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: '질문 또는 데이터가 존재하지 않습니다',
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
        description: 'ChatGPT API 호출 실패',
        content: {
          'application/json': {
            example: {
              message: 'ChatGPT API ERROR',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
};
