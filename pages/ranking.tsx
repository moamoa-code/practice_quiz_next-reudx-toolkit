import type { NextPage } from 'next'
import styled from "styled-components";
import { useSelector } from 'react-redux';
import UserProfile from '../components/UserProfile';
import User from '../interface/user';
import { useMemo, useState } from 'react';
import { message } from 'antd';
import { Container, LayoutContainer } from '../components/styledComponents';
import HeadNav from '../components/HeadNav';

const RankingDiv = styled.div`
  padding: 40px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 100%;
  max-width: 1280px;
  justify-content: space-around;
  gap: 50px;
  flex-wrap: wrap;
`

const RankBoard = styled.div`
  flex: 1;
  min-width: 400px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .user {
    padding: 0 20px 0 20px;
    justify-content: center;
    gap: 50px;
    border: 3px solid #5a5e6a;
    border-radius: 8px;
    align-items: center;
    display: flex;
    height: 90px;
    font-size: 2rem;
    font-weight: bold;
    .rank {
      align-items: center;
      margin-right: auto;
    }
    .profile {
      align-items: center;
      flex: 1;
      .img {
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        img {
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
          padding-bottom: 5px;
        }
      }
      .id {
        display: inline-block;
        margin-left: 15px;
      }
    }
    .hit-rate{
      margin-left: auto;
    }
  }
`
const Ranking: NextPage = () => {
  const { loggedInUser } = useSelector((state:any) => state.info);
  const { users } = useSelector((state:any) => state.users);
  const [ selectedUser, setSelectedUser ] = useState(loggedInUser);
  const bestStyle = useMemo(() => ({ border: "3px solid #0e6652", backgroundColor: "rgba(17,67,64,0.4)"}), []);
  const secondStyle = useMemo(() => ({ border: "3px solid #654a26", backgroundColor: "rgba(62,50,39,0.4)" }), []);
  const thirdStyle = useMemo(() => ({ border: "3px solid #561e49", backgroundColor: "rgba(64,30,62,0.4)" }), []);

  return (
    <LayoutContainer>
      <HeadNav />
      <Container>
        <RankingDiv>
          <UserProfile userId={selectedUser}/>
          <RankBoard>
            {users?.map(
              (user:User, i) => {
                if(user.rank != -1){
                  return (
                    <div 
                      className='user' 
                      onClick={()=>{
                        setSelectedUser(user?.id);
                      }}
                      style={
                        i === 0?
                        bestStyle
                        : i === 1?
                        secondStyle
                        : i === 2?
                        thirdStyle
                        : null
                      }
                      >
                      <div className='rank'>{user?.rank}</div>
                      <div className='profile'>
                        <div className='img'>
                          <img src='/profile.png' />
                        </div>
                        <span className='id'>{user?.id}</span>
                      </div>
                      <div className='hit-rate'>{(user?.hitRate*100).toFixed(0)}%</div>
                    </div>
                  )
                } else {
                  return (
                    <div className='user'>
                      {user?.id} 님, 랭커에 도전해보세요
                    </div>
                  )
                }
              }
            )}
          </RankBoard>
        </RankingDiv>
      </Container>
    </LayoutContainer>
  )
}

export default Ranking
