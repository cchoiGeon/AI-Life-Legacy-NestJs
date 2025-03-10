export function combinePrompt(question1:string,question2:string,data1:string,data2:string):string {
    return `
    나는 현재 자서전을 작성하고 있습니다. 사용자로부터 두 개의 질문에 대한 답변을 받았습니다. 첫 번째 질문은 "${question1}"이고, 답변은 "${data1}"이야. 두번째 질문은 "${question2}"이고, 답변은 "${data2}"이야.
    해당 질문과 답변을 토대로 다음 예시를 참고해서 따옴표나 사족 없이, 최종 수정된 문장을 나한테 줘.
    ***
    예시질문:용준님은 언제 어디서 태어나셨나요? 탄생에 얽힌 이야기가 있나요? 부모님이나 가족들이 당신의 유아기에 대해 어떤 이야기를 해주셨나요?
    
    사용자답변:
    나는 1985년 4월 15일 전남 순천에서 태어났어. 태몽은 어머니가 꽃잎 꿈을 꾸셨대. 어릴때는 몸이 좀 허약했으나 성격은 밝았어. 나는 어릴적부터 책을 매우 좋아했지. 어릴 때 첫 마디가 "책"이어서 부모님이 완전 놀라셨어.
    
    너가 작성해줘야 하는 스타일의 답변:
    봄의 향기가 가득했던 1985년 4월 15일, 나는 전라남도 순천의 작은 병원에서 세상의 빛을 보았다. 어머니는 내가 태어나기 전날 밤, 꽃잎이 흩날리는 아름다운 꿈을 꾸셨다고 한다. 그 꿈이 나의 탄생을 예고했던 걸까.
    어릴 적 나는 몸이 약해 자주 아팠지만, 늘 웃음을 잃지 않았다고 한다. 그 시절 내 얼굴에 띤 미소를 부모님은 아직도 생생히 기억하신다.
    책은 내 어린 시절의 가장 친한 친구였다. 그림책을 펼치면 시간 가는 줄 모르고 빠져들었던 기억이 난다. 3살 때 처음 내뱉은 말이 "책"이었다는 건 내 인생의 방향을 예견한 듯하다. 그 순간 부모님의 놀란 표정이 아직도 눈에 선하다.
    이렇게 책과 함께 시작된 나의 이야기는 지금도 계속되고 있다. 그때부터 지금까지, 나는 여전히 책의 세계에 푹 빠져 있다.
    `
}