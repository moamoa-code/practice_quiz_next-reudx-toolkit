import Link from "next/link";
import React, { FC, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logOut } from "../store/infoSlice";
import styled from "styled-components";
import { message } from "antd";
import Router from "next/router";

const Layout = styled .div`
  a {color: #fff; text-decoration: none; outline: none}
  padding: 0;
  background-color: #131626;
  width: 100%;
  color: white;
  margin: 0;
  .header {
    flex-wrap: wrap;
    font-size: 1.4rem;
    padding: 50px;
    display: flex;
    justify-content: space-between;
    .menu {
      flex-wrap: wrap;
      display: flex;
      gap: 3rem;
      div {
      }
    }
    .logo {
      font-size: 2rem;
      font-weight: bold;
    }
  }
`;
const HeadNav = () =>  {
  const { loggedInUser } = useSelector((state:any) => state.info);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    message.success('로그아웃 되었습니다.');
    Router.replace('/login');
  }

  return (
    <Layout>
      {loggedInUser?
        <div className="header">
          <div className="logo">
            <Link href={'/'}><a>QUIZWEB</a></Link>
          </div>
          <div className="menu">
            <div>
              <Link href={'/quiz'}><a>QUIZ</a></Link>
            </div>
            <div>
              <Link href={'/ranking'}><a>RANKING</a></Link>
            </div>
            <div>
              <Link href={'/mypage'}><a>MYPAGE</a></Link>
            </div>
            <div>
              <span onClick={logout}>LOGOUT</span>
            </div>
          </div>
        </div>
        :
        <div className="header">
          <div className="logo">
            <Link href={'/'}><a>QUIZWEB</a></Link>
          </div>
          <div className="menu">
            <div>
              <Link href={'/quiz'}><a>QUIZ</a></Link>
            </div>
            <div>
              <Link href={'/ranking'}><a>RANKING</a></Link>
            </div>
            <div>
              <Link href={'/login'}><a>LOGIN</a></Link>
            </div>
          </div>
        </div>
        }
    </Layout>
  );
};


export default HeadNav;
