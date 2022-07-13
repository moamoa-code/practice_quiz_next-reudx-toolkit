import HitQuiz from "./hitQuiz";

export default interface User {
  id: string; //  아이디
  password: string; // 비밀번호
  try: number;  // 총 시도 횟수
  hits: number; // 총 정답 수
  hitQuizzes : HitQuiz[]  // 시도한 문제 상세
  hitRate: number;  //  hits/try
  rank: number; // 순위
}