import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import User from "../interface/user";

const Profile = styled.div`
  margin:0 auto;
  font-weight: bold;
  border: 3px solid #5a5e6a;
  border-radius: 12px;
  background-color: #262938;
  color: #ffffff;
  width: 400px;
  height: 400px;
  .profile {
    margin-top: 50px;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    img {
      border: 1px solid blue;
      width: 100px;
    }
    span {
      flex:1;
      font-size: 2rem;
    }
  }
  .info {
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: space-around;
    .unit {
      display: flex;
      flex-direction: column;
      text-align: center;
      .title {
        color: #bec1c7;
        font-size: 1.2rem;
      }
      .number {
        color: #00e697;
        font-size: 1.8rem;
      }
    }
  }
`

export default function QuizCard({userId}) {
  const { users } = useSelector((state:any) => state.users);
  const [ userInfo, setUserInfo ] = useState<User>();

  useEffect(() => {
    if (users) {
      const user = users.find((v) => v.id === userId)
      setUserInfo(user);
    }
  }, [users, userId]);


  if (!userInfo) {
    return (
      <Profile>
        <h1>로딩중이거나 데이터가 없습니다.</h1>
      </Profile>
    )
  }
  return (
    <>
      <Profile>
        <div className="profile">
          <img src="profile.png" />
          <span>{userInfo?.id}</span>
        </div>
        <div className="info">
          <div className="unit">
            <div className="title">RANK</div>
            <div className="number">
              {userInfo?.rank === -1?
              <span>-</span>
              : <span>{userInfo?.rank}</span>}
            </div>
          </div>
          <div className="unit">
            <div className="title">푼 퀴즈 개수</div>
            <div className="number">{userInfo?.hits}</div>
          </div>
        </div>
      </Profile>
    </>
  );
}