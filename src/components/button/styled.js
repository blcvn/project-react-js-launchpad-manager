import { Button } from "antd";
import styled from "styled-components";

export const ButtonColorStyles = styled(Button)`
  background-color: ${(props) => props.color};
`;
