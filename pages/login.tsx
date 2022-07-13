import type { NextPage } from 'next'
import HeadNav from '../components/HeadNav';
import Signup from '../components/Login'
import { Container, LayoutContainer } from '../components/styledComponents';

const Login: NextPage = () => {
  return (
    <LayoutContainer>
      <HeadNav />
      <Container>
        <Signup />
      </Container>
    </LayoutContainer>
  )
}

export default Login
