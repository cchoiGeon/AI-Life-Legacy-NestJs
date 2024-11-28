import { Injectable } from '@nestjs/common';
import { CaseList } from './case.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMainQuestionDTO } from './dto/myprofile.dto';

@Injectable()
export class MyprofileService {
    constructor(
        @InjectRepository(CaseList)
        private caseRepository: Repository<CaseList>,
    ) {}
    async getMainQuestion( caseId: string ) {
        const caseDataList = await this.caseRepository.find({where: {caseId}});

        const result = caseDataList.map((caseData,index)=>{
            return {
                [index + 1]: caseData.content, // 계산된 키 사용
            };
        });

        const result2 = result.reduce((acc, item) => {
            const key = Object.keys(item)[0]; // 현재 객체의 키 추출
            acc[key] = item[key];            // 누적 객체에 추가
            return acc;
        }, {});
        return result2
    }
}
