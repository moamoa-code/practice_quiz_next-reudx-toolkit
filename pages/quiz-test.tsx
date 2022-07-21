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
import Quiz from '../interface/quiz';

const QUIZ = 'QUIZ';
const CREATE = 'CREATE';

const QuizPage: NextPage = () => {
  const { users } = useSelector((state:any) => state.users);
  const { quizzes } = useSelector((state:any) => state.quiz);
  const [ quizList, setQuizList ] = useState();
  const [ quiz, setQuiz ] = useState<Quiz>({
    id: '0',
    question: '',
    answer: '',
    fake1: '',
    fake2: ''
  });
  const [ mode, setMode ] = useState(QUIZ);
  const { loggedInUser } = useSelector((state:any) => state.info);

  // 다음 풀 퀴즈를 가져온다.
  const getQuiz = () => {
    console.log('퀴즈 가져오기');
    const me = users.find((v) => v.id === loggedInUser);
    let myHitQuiz:HitQuiz[] = me?.hitQuizzes;
    console.log('quizzes',quizzes)
    console.log('myHitQuiz',myHitQuiz)
    let quizzesIcanTry = quizzes.filter(
      function(quiz){
        if(myHitQuiz.findIndex(x => x.quizId === quiz.id) === -1) {
          return true
        } 
      }
    )
    console.log('quizzesIcanTry',quizzesIcanTry)
    let selectedQuizIdx;
    let count = 0;
    while(1) {
      selectedQuizIdx = Math.floor(Math.random() * quizzesIcanTry.length);
      if(quizzesIcanTry.length <= 1 || quizzesIcanTry[selectedQuizIdx].id !== quiz?.id){
        break;
      }
      count ++;
      if (count > 9999){
        console.log('긴급탈출');
        return;
      }
    }
    setQuizList(quizzesIcanTry);
    setQuiz(quizzesIcanTry[selectedQuizIdx])
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
    if (loggedInUser) {
      getQuiz();
    }
  }, [loggedInUser, quizzes]);

  if (mode === CREATE) {
    return (
      <LayoutContainer>
        <HeadNav />
        <Container>
          <CreatQuiz setMode={setMode}></CreatQuiz>
        </Container>
      </LayoutContainer>
    )
  }

  return (
    <LayoutContainer>
      <HeadNav />
      <Container>
        {JSON.stringify(quiz)}
        <hr />
        {JSON.stringify(quizList)}
        <br/>
        <QuizCard quiz={quiz} getRandomQuiz={getQuiz} setMode={setMode}/>
      </Container>
    </LayoutContainer>
  )

}

export default QuizPage
