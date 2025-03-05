import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetUserCaseDTO {
  @ApiProperty({ example: 'case1', description: '유저 케이스 이름' })
  @IsString()
  caseName: string;
}

export class UserUuidDTO {
  @ApiProperty({ description: '유저 UUID', example: '8f4e5f49-c4bf-4e7a-b55f-dffac2fbb560' })
  uuid: string;
}

export class UserCaseDTO {
  @ApiProperty({ description: '유저 케이스', example: 'case1' })
  name: string;
}

export class UserContentDTO {
  @ApiProperty({ description: '유저 목차 id', example: 1 })
  id: number;
  @ApiProperty({ description: '유저 목차 내용', example: '탄생과 유아기 시절' })
  content: string;
}

export class UserQuestionDTO {
  @ApiProperty({ description: '유저 질문 id', example: 1 })
  id: number;

  @ApiProperty({
    description: '유저 질문 내용',
    example:
      '탄생과 유아기 시절언제 어디서 태어나셨나요? 탄생에 얽힌 이야기가 있나요? 부모님이나 가족들이 당신의 유아기에 대해 어떤 이야기를 해주셨나요?',
  })
  question: string;
}

export class UserContentAndQuestionsDTO {
  @ApiProperty({ description: '유저 목차 id', example: 1 })
  id: number;

  @ApiProperty({ description: '유저 목차 내용', example: '탄생과 유아기 시절' })
  content: string;

  @ApiProperty({
    description: '유저 질문 내용 리스트',
    example: [
      {
        id: 1,
        question: '탄생과 유아기 시절',
      },
      {
        id: 2,
        question: '학창 시절에 가장 기억에 남는 순간은?',
      },
    ],
  })
  questions: UserQuestionDTO[];
}

export class UserPostsDTO {
  @ApiProperty({ description: '유저 답변', example: '유저 답변' })
  response: string;

  @ApiProperty({ description: '유저 목차 내용', example: '탄생과 유아기 시절' })
  content: string;

  @ApiProperty({
    description: '유저 질문 내용',
    example:
      '탄생과 유아기 시절언제 어디서 태어나셨나요? 탄생에 얽힌 이야기가 있나요? 부모님이나 가족들이 당신의 유아기에 대해 어떤 이야기를 해주셨나요?',
  })
  question: string;
}
