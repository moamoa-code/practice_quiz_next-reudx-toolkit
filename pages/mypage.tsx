import type { NextPage } from 'next'
import { useSelector } from 'react-redux';
import HeadNav from '../components/HeadNav';
import { Container, LayoutContainer } from '../components/styledComponents';
import UserProfile from '../components/UserProfile';

const Mypage: NextPage = () => {
  const { loggedInUser } = useSelector((state:any) => state.info);

  return (
    <LayoutContainer>
      <HeadNav />
      <Container>
        <UserProfile userId={loggedInUser}/>
      </Container>
    </LayoutContainer>
  )
}

export default Mypage
