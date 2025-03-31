import { Button } from "antd";
import styled from "styled-components";

export const ButtonColorStyles = styled(Button)`
  background-color: ${(props) => props.color};
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
`;
