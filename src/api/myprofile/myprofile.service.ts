import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CaseList } from '../../db/entity/case.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MyprofileService {
    constructor(
        @InjectRepository(CaseList)
        private caseRepository: Repository<CaseList>,
    ) {}

    async getMainQuestion(caseId: string): Promise<Record<string, string>> {
        try {
            // 데이터베이스에서 caseId에 해당하는 데이터 조회
            const caseList = await this.caseRepository.find({ where: { caseId } });
            if (!caseList || caseList.length === 0) {
                throw new NotFoundException();
            }

            // 각 데이터를 매핑하여 새로운 객체 배열 생성
            const indexedContentList = caseList.map((caseItem, index) => ({
                [index + 1]: caseItem.content, // 계산된 키 사용
            }));

            // 배열을 단일 객체로 병합
            const combinedContent = indexedContentList.reduce((acc, item) => {
                const key = Object.keys(item)[0]; // 현재 객체의 키 추출
                acc[key] = item[key];            // 누적 객체에 추가
                return acc;
            }, {});

            return combinedContent;
        } catch (error) {
            console.error('Error in getMainQuestion:', error);
            if(error.status == 404){
                throw new NotFoundException('Not Found User CaseId');
            }
            throw new InternalServerErrorException('Failed to get main question data');
        }
    }
}
