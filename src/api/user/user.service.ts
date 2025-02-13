import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCaseRepository } from '../user-case/user-case.repository';
import { SetUserCaseDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private userCaseRepository: UserCaseRepository,
    ) {} 

    async getUserCase(uuid: string): Promise<string> {
        const user = await this.userRepository.findUserByUUID(uuid);
        if (!user) {
            throw new NotFoundException("Not Found User");
        }

        return user.userCase.name;
    }

    async setUserCase(uuid: string, setUserCaseDTO: SetUserCaseDTO ) {
        const { caseName } = setUserCaseDTO;

        const user = await this.userRepository.findUserByUUID(uuid);
        if(!user) throw new UnauthorizedException("Not Exist User");

        // 케이스네임으로 UserCase에 접근해서 해당 caseName 있는지 확인
        const userCase = await this.userCaseRepository.findCaseByCaseName(caseName);
        if(!userCase) throw new NotFoundException("Not Found Case, Check CaseName"); // 만약 없으면 에러 던지기 

        // 있으면 해당 caseId를 user_case(FK)에 저장 
        user.userCase = userCase;

        return await this.userRepository.saveUser(user);
    }
}
