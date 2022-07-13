import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { logIn, logOut } from "../store/infoSlice";
import styled from "styled-components";
import User from '../interface/user';
import { message } from "antd";
import Router from 'next/router';
import { SimpleFormDiv } from "./styledComponents";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { users } = useSelector((state:any) => state.users);
  const { loggedInUser } = useSelector((state:any) => state.info);
  const dispatch = useDispatch();

  // 로그인 및 회원가입 처리
  const loginClick = (event) => {
    event.preventDefault();
    if (id.length < 1) {
      return message.error('아이디를 입력하세요');
    }
    if (password.length < 1) {
      return message.error('비밀번호를 입력하세요.');
    }
    let userIdx = users.findIndex((v:User) => v.id === id);
    if (userIdx === -1) {
      const user:User = {
        id,
        password,
        try: 0,
        hits: 0,
        hitQuizzes: [],
        hitRate: 0,
        rank: -1,
      }
      dispatch(addUser(user));
      // 로그인처리 및 다음페이지로
      dispatch(logIn(id));
      message.success('회원가입 및 로그인 되었습니다.');
      return Router.replace('/mypage');
    }
    if (users[userIdx].password === password) {
      // 로그인처리 및 다음페이지로
      dispatch(logIn(id));
      message.success('로그인 되었습니다.');
      return Router.replace('/mypage');
    } else {
      setPassword('');
      dispatch(logOut());
      return message.error('비밀번호가 틀렸습니다.');
    }
  };

  const onChangeId = (event) => {
    setId(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <SimpleFormDiv>
      <form>
        <div>
          <label>아이디를 입력하세요.</label>
          <input 
            type="text"
            maxLength={12}
            value={id}
            placeholder="ID"
            onChange={onChangeId}
          />
        </div>
        <div>
          <label>비밀번호를 입력하세요</label>
          <input 
            type="password"
            value={password}
            maxLength={12}
            placeholder="Password"
            onChange={onChangePassword}
          />
        </div>
        <div className="btnWrap">
          <button onClick={loginClick}>로그인</button>
        </div>
      </form>
    </SimpleFormDiv>
  );
}