import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import Head from 'next/head';

// 리덕스 설정
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>김모아</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp);
