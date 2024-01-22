import styled from "styled-components";
import bgImage from "../../assets/authBacground";

namespace AuthStyles {
  export namespace Register {
    export const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: ${bgImage};
      background-size: cover;
      background-position: center;
    `;
    export const Form = styled.form`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      min-width: 200px;
      min-height: 200px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 30px 40px;
    `;
    export const Title = styled.h1`
      font-size: 20px;
      margin-bottom: 20px;
      letter-spacing: 1px;
    `;
    export const Link = styled.a`
      font-size: 12px;
      color: #333;
      margin-top: 20px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: #349;
        cursor: pointer;
      }
    `;
  }
}

export default AuthStyles;
