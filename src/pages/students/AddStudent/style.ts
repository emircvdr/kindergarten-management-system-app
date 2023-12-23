import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 80%;
`;

export const StyledContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const StyledContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const StyledIconContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin: 20px 0 0 0;
`;

export const StyledIcon = styled(BsPersonCircle)`
  font-size: 80px;
  color: lightgray;
  border-radius: 50%;
  overflow: hidden;
`;

export const StyledFileInput = styled.input`
  display: none;
`;