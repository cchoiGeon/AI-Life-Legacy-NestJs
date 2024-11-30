export const myProfileSwaggerDocs = {
    getMainQuestion: {
      summary: '메인 질문 조회',
      description: '주어진 caseId에 해당하는 메인 질문 데이터를 조회합니다.',
      parameters: [
        {
          name: 'caseId',
          in: 'path',
          required: true,
          description: '조회할 케이스 ID',
          schema: {
            type: 'string',
            example: 'case_1',
          },
        },
      ],
      responses: {
        200: {
          description: '메인 질문 조회 성공',
          content: {
            'application/json': {
              example: {
                message: 'Success',
                statusCode: 200,
                result: {
                  "1": "첫 번째 질문",
                  "2": "두 번째 질문",
                  "3": "세 번째 질문",
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
                message: 'Invalid caseId provided',
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
          description: '케이스 ID를 찾을 수 없음',
          content: {
            'application/json': {
              example: {
                message: 'Not Found User CaseId',
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
                message: 'Failed to get main question data',
                error: 'Internal Server Error',
                statusCode: 500,
              },
            },
          },
        },
      },
    },
  };
  