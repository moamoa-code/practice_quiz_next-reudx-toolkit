import { RightCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { hitQuiz, missQuiz } from "../store/userSlice"

const Card = styled.div`
  margin: auto;
  margin-top: 50px;
  position: relative;
  max-width: 600px;
  height: 400px;
  flex-direction: column;
  display: flex;
  .message, .quiz {
    margin-bottom: 10px;
    background: #262938;
    border: 3px solid #5a5e6a;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      font-size: 1.5rem;
    }
  }
  .select_answer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    button {
      background: #262938;
      border: 3px solid #5a5e6a;
      border-radius: 12px;
      border-radius: 8px;
      border: none;
      flex: 1;
      height: 4rem;
    }
  }
  .skip {
    position: absolute;
    bottom: 6.5rem;
    right: 1.5rem;
    color: #7f828c;
    background: none;
    border: none;
  }
  .add_q {
    border: 3px solid #0e765a;
    border-radius: 8px;
    width: 8rem;
    height: 4rem;
    position: absolute;
    top: -2rem;
    left: -4rem;
    z-index: 9;
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(30,30,30,0.1);
    backdrop-filter: blur(10px);
  }
`

export default function QuizCard({quiz, getRandomQuiz, setMode, quizIdx}) {
  const [answers, setAnswers] = useState<Array<string>>();
  const { loggedInUser } = useSelector((state:any) => state.info);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongIdx, setWrongIdx] = useState(-1);
  const [correctIdx, setCorrectIdx] = useState(-1);
  const wrongStyle = useMemo(() => ({ backgroundColor: "red" }), []);
  const correctStyle = useMemo(() => ({ backgroundColor: "#00e697" }), []);
  const dispatch = useDispatch();

  // 정답, 오답 버튼 순서 섞기
  useEffect(() => {
    if (quiz) {
      let list = [];
      list.push(quiz.answer);
      list.push(quiz.fake1);
      list.push(quiz.fake2);
      list.sort(()=> Math.random() - 0.5);
      setAnswers(list);
    }
    console.log(quiz);
  }, [quiz]);


  if (quiz === null || quiz === undefined) {
    return (
      <Card>
        <div className="message">
          <div>퀴즈를 등록해주세요.</div>
        </div>
        <button className="add_q" onClick={() => {setMode('CREATE')}}>+ 문제추가</button>
      </Card>
    )
  }

  const checkAnswer = (v, idx) => (e) => {
    if (v === quiz.answer) {
      // 정답처리
      setIsLoading(true);
      setCorrectIdx(idx);
      dispatch(hitQuiz(
        {
          quizIdx: quizIdx,
          userId: loggedInUser
        }
      ))
      // 이펙트
      setTimeout(function() {
        setIsLoading(false);
        setCorrectIdx(-1);
      }, 1500);
      message.success('정답입니다!');
      setTimeout(function() {
        getRandomQuiz();
      }, 800);

    } else {
      // 오답처리
      setIsLoading(true);
      setWrongIdx(idx);
      dispatch(missQuiz({
        quizIdx: quizIdx,
        userId: loggedInUser
      }));
      // 이펙트
      message.error('저런.. 다시한번 생각해보세요.');
      setTimeout(function() {
        setIsLoading(false);
        setWrongIdx(-1);
      }, 1500);
    }
    console.log(e);
  }

  return (
    <Card>
      <div className="quiz">
        <div>{quiz?.question}</div>
      </div>
      <div className="select_answer">
        {answers?.map((v, i) => {
          return <button 
            key={i} 
            onClick={checkAnswer(v, i)} 
            style={
              wrongIdx === i? wrongStyle 
              : correctIdx === i? correctStyle
              : null
            }
            disabled={isLoading}
          >{v}</button>
        })}
      </div>
      <button className="add_q" onClick={() => {setMode('CREATE')}} disabled={isLoading}>+ 문제추가</button>
      <button className="skip" onClick={getRandomQuiz} disabled={isLoading}><RightCircleOutlined />  건너뛰기</button>
    </Card>
  );
}