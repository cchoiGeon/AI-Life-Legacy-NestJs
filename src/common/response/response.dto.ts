import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDTO {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: '성공 메시지',
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    description: 'Response 데이터',
    example: 'Response Data',
  })
  result: any;

  constructor(result: any = null) {
    this.message = 'Success'; // 기본 메시지 "Success"를 제공
    this.statusCode = 200;
    if (result) {
      this.result = result;
    }
  }
}
export class Success204ResponseDTO {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: '성공 메시지',
    example: 'Success',
  })
  message: string;

  constructor() {
    this.message = 'Success'; // 기본 메시지 "Success"를 제공
    this.statusCode = 204;
  }
}

export class BadRequestResponseDTO {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: '에러 메시지',
    example: 'Bad Request',
  })
  message: string;

  constructor(message: string = 'Bad Request') {
    this.message = message;
    this.statusCode = 400;
  }
}
export class UnauthorizedResponseDTO {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: '에러 메시지',
    example: 'Unauthorized',
  })
  message: string;

  constructor(message: string = 'Unauthorized') {
    this.message = message;
    this.statusCode = 401;
  }
}

export class NotFoundResponseDTO {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: '에러 메시지',
    example: 'Not Found',
  })
  message: string;

  constructor(message: string = 'Not Found') {
    this.message = message;
    this.statusCode = 404;
  }
}

export class InternalServerResponseDTO {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: '에러 메시지',
    example: 'Internal Server Error',
  })
  message: string;

  constructor(message: string = 'Internal Server Error') {
    this.message = message;
    this.statusCode = 500;
  }
}