export default interface HitQuiz {
  quizIdx: number, // 퀴즈 배열 인덱스
  try: number,  // 시도 횟수
  correct: boolean  // 정답 맞췄는지 여부
}