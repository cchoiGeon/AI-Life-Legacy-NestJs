export class SuccessResponseDTO {
    isSuccess: true;
    message: string;
    result: any;

    constructor(result: any = "") {
        this.isSuccess = true; // 항상 성공 상태
        this.message = "Success"; // 기본 메시지 "Success"를 제공
        this.result = result; // 결과 값 설정
    } 
}