import styled from "styled-components";

export const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
`;
