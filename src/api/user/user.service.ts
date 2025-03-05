import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCaseRepository } from '../user-case/user-case.repository';
import { SetUserCaseDTO, UserCaseDTO, UserContentAndQuestionsDTO, UserContentDTO, UserPostsDTO } from './dto/user.dto';
import { ContentsRepository } from '../content/contents.repository';
import { PostRepository } from '../post/post.repository';
import { Users } from '../../db/entity/users.entity';
import { Posts } from '../../db/entity/posts.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userCaseRepository: UserCaseRepository,
    private contentsRepository: ContentsRepository,
    private postsRepository: PostRepository,
  ) {}

  async getUserCase(uuid: string): Promise<UserCaseDTO> {
    const user = await this.userRepository.findUserByUUID(uuid);
    if (!user) throw new NotFoundException('Not Found User');
    return { name: user.userCase.name };
  }

  async setUserCase(uuid: string, setUserCaseDTO: SetUserCaseDTO): Promise<UserCaseDTO> {
    const { caseName } = setUserCaseDTO;
    const user = await this.userRepository.findUserByUUID(uuid);
    if (!user) throw new NotFoundException('Not Found User');

    // 케이스네임으로 UserCase에 접근해서 해당 caseName 있는지 확인
    const userCase = await this.userCaseRepository.findCaseByCaseName(caseName);
    if (!userCase) throw new NotFoundException('Not Found Case, Check CaseName'); // 만약 없으면 에러 던지기

    // 있으면 해당 caseId를 user_case(FK)에 저장
    user.userCase = userCase;

    await this.userRepository.saveUser(user);
    return { name: userCase.name };
  }

  async getUserContents(uuid: string): Promise<UserContentDTO[]> {
    const { name } = await this.getUserCase(uuid);

    const { contentMappings } = await this.userCaseRepository.findContentsByCaseName(name);

    const userContentList = contentMappings.map((contents) => {
      return {
        id: contents.content.id,
        content: contents.content.text,
      };
    });
    return userContentList;
  }

  async getQuestionsByContentId(contentId: number): Promise<UserContentAndQuestionsDTO> {
    const result = await this.contentsRepository.findQuestionsByContentsId(contentId);
    if (!result) throw new NotFoundException('Not Found Content');

    const content = result.text;
    const questionList = result.questions.map((question) => {
      return {
        id: question.question.id,
        question: question.question.text,
      };
    });

    return {
      id: contentId,
      content: content,
      questions: questionList,
    };
  }

  async getAllUserPostsByUUID(uuid: string): Promise<UserPostsDTO[]> {
    const userPosts: Posts[] = await this.postsRepository.findAllUserPostsByUUID(uuid);
    if (userPosts.length == 0) throw new NotFoundException('Not Found Posts');

    const result = userPosts.map((post) => {
      return {
        response: post.response,
        content: post.content.text,
        question: post.question.text,
      };
    });
    return result;
  }

  async deleteUser(uuid: string, deleteType: number) {
    const user = await this.userRepository.findUserByUUID(uuid);
    if (!user) throw new NotFoundException();
    user.deleteType = deleteType;
    await this.userRepository.deleteUser(user);
  }
}
