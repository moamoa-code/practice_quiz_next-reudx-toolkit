import styled from "styled-components";

export const Container = styled.div`
  padding: 50px 10px 50px 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const LayoutContainer = styled.div`
  a {color: #fff; text-decoration: none; outline: none}
  padding: 0;
  background-color: #131626;
  width: 100%;
  height: 100vh;
  color: white;
  margin: 0;
  margin: 0 auto;
`

// 폼
export const SimpleFormDiv = styled.div`
  font-size: 1.1rem;
  margin: auto;
  min-width: 400px;
  max-width: 600px;
  div {
    label {
      display: block;
      margin: 15px 0 10px 0;
    }
    input {
      margin: 8px 0 8px 0;
      border: 3px solid #5a5e6a;
      border-radius: 8px;
      width: 100%;
      padding: 10px 20px 10px 20px;
      background: #262938;
    }
    input::placeholder {color:#5a5e6a;}
  }
  .btnWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    button {
      background-color: #00e697;
      margin-top: 30px;
      border: none;
      width: 9rem;
      border-radius: 8px;
      height: 3.2rem;
    }
  }
`