import { message } from 'antd';
import type { NextPage } from 'next'
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatQuiz from "../components/CreateQuiz";
import HeadNav from '../components/HeadNav';
import QuizCard from '../components/QuizCard';
import { Container, LayoutContainer } from '../components/styledComponents';
import HitQuiz from '../interface/hitQuiz';

const QUIZ = 'QUIZ';
const CREATE = 'CREATE';

const QuizPage: NextPage = () => {
  const { users } = useSelector((state:any) => state.users);
  const { quizzes } = useSelector((state:any) => state.quiz);
  const [quizIdx, setQuizIdx] = useState<number>(-1);
  const { loggedInUser } = useSelector((state:any) => state.info);
  const [ mode, setMode ] = useState(QUIZ);

  // 무작위로 풀수있는 문제 하나 가져오기
  const getRandomQuiz = () => {
    if (quizzes && quizzes.length >= 1 && loggedInUser) {
      const me = users.find((v) => v.id === loggedInUser);
      let selectedQuizIdx = -1;
      let myHitQuiz:HitQuiz[] = me?.hitQuizzes;
      let quizIcanTry;
      if (me.hitQuizzes.length >= 1){
        quizIcanTry = quizzes.filter(
          (q, i) => myHitQuiz.findIndex((mq) => mq.quizIdx === i && mq.correct === true) === -1
        )
      } else {
        quizIcanTry = quizzes;
      }
      console.log('quizIcanTry',quizIcanTry);
      if (quizIcanTry.length >= 1){
        let count = 0;
        while(1) {
          count++;
          selectedQuizIdx = Math.floor(Math.random() * quizzes.length);
          if (quizIcanTry.length === 1 && quizzes[selectedQuizIdx] == quizIcanTry[0]){
            // message.info('마지막 남은 문제입니다. 화이팅!');
            return setQuizIdx(selectedQuizIdx);
          }
          if (myHitQuiz.findIndex((mq) => mq.quizIdx === selectedQuizIdx && mq.correct === true) === -1) {
            return setQuizIdx(selectedQuizIdx);
          }
          if (count > 9999){
            return console.log('긴급탈출');
          }
        }
      } else {
        // message.info('더이상 풀 문제가 없어요...');
        return setQuizIdx(-1);
      }
    }
  }

  // 로그인체크
  useEffect(() => {
    if(!loggedInUser) {
      Router.replace('/login');
      message.error('로그인이 필요합니다.');
    }
  }, [loggedInUser]);

  // 퀴즈 랜덤 추출
  useEffect(() => {
    if (quizIdx === -1 && loggedInUser) {
      getRandomQuiz();
    }
  }, [quizzes, quizIdx]);

  if (mode === CREATE) {
    return (
      <LayoutContainer>
        <HeadNav />
        <Container>
          <CreatQuiz setMode={setMode} setQuizIdx={setQuizIdx}></CreatQuiz>
        </Container>
      </LayoutContainer>
    )
  }
  return (
    <LayoutContainer>
      <HeadNav />
      <Container>
        <QuizCard quiz={quizzes[quizIdx]} quizIdx={quizIdx} getRandomQuiz={getRandomQuiz} setMode={setMode}/>
      </Container>
    </LayoutContainer>
  )

}

export default QuizPage
