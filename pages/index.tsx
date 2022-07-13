import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router';
import { message, Spin } from 'antd'
import { Container, LayoutContainer } from '../components/styledComponents'
import HeadNav from '../components/HeadNav';

const Home: NextPage = () => {
  const { loggedInUser } = useSelector((state:any) => state.info);
  // 로그인체크
  useEffect(() => {
    if(!loggedInUser) {
      Router.replace('/login');
    }
  }, [loggedInUser]);

  return (
    <LayoutContainer>
      <HeadNav />
      <Container style={{textAlign: 'center'}}>
        <Spin size="large" />
      </Container>
    </LayoutContainer>
  )
}

export default Home
