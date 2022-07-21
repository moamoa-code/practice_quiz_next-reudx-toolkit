export default interface Quiz {
  id: string; // 퀴즈 UUID
  question: string; // 질문
  answer: string; // 정답
  fake1: string;  // 오답1
  fake2: string;  // 오답2
}