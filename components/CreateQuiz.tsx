import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Quiz from '../interface/quiz';
import { addQuize } from "../store/quizSlice";
import { message } from "antd";
import { SimpleFormDiv } from "./styledComponents";
import { v4 as uuidv4 } from 'uuid';

export default function CreateQuiz({setMode}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [fake1, setFake1] = useState("");
  const [fake2, setFake2] = useState("");
  const [quizList, setQuizList] = useState<Array<Quiz>>([]);
  const { quizzes } = useSelector((state:any) => state.quiz);
  const [ isBtnDisabled, setIsBtnDisabled ] = useState(true);
  const dispatch = useDispatch();
  const disabledStyle = useMemo(() => ({ backgroundColor: "#3b3f4a" }), []);

  // 버튼 활성화
  useEffect(() => {
    if (question.length >= 1 && answer.length >= 1 && fake1.length >= 1 && fake2.length >= 1) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [question, answer, fake1, fake2]);

  useEffect(() => {
    if (quizzes) {
      setQuizList(quizzes);
    } 
  }, [quizzes]);

  // 퀴즈 등록 클릭
  const createQuiz = (event) => {
    const list = [...quizList];
    const id = uuidv4();
    event.preventDefault();
    const quiz:Quiz = {
      id : id,
      question,
      answer,
      fake1,
      fake2,
    }
    list.push(quiz);
    setQuizList(list);
    dispatch(addQuize(quiz));
    message.success('퀴즈를 등록했습니다.');
    setAnswer('');
    setFake1('');
    setFake2('');
    setQuestion('');
    setMode('QUIZ');
  };

  const onChangeQ = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };
  const onChangeA = (event:React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };
  const onChangeF1 = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFake1(event.target.value);
  };
  const onChangeF2 = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFake2(event.target.value);
  };

  return (
    <SimpleFormDiv>
      <form>
        <div>
          <label>문제를 적어주세요.</label>
          <input 
            type="text"
            maxLength={100}
            value={question}
            placeholder="ex. 바나나의 색상은?"
            onChange={onChangeQ}
          />
        </div>
        <div>
          <label>정답을 적어주세요.</label>
          <input 
            type="text"
            value={answer}
            maxLength={100}
            placeholder="ex. 노란색"
            onChange={onChangeA}
          />
        </div>
        <div>
          <label>오답을 적어주세요.</label>
          <input 
            type="text"
            value={fake1}
            maxLength={100}
            placeholder="ex. 빨간색"
            onChange={onChangeF1}
          />
          <input 
            type="text"
            value={fake2}
            maxLength={100}
            placeholder="ex. 보라색"
            onChange={onChangeF2}
          />
        </div>
        <div className="btnWrap">
          <button 
            onClick={createQuiz}
            disabled={isBtnDisabled}
            style={
              isBtnDisabled? disabledStyle
              : null
            }
          >퀴즈 등록하기</button>
          <button
            onClick={()=>{setMode('QUIZ')}}
          >취소</button>
        </div>

      </form>
      <br/>
      <br/>

    </SimpleFormDiv>
  );
}