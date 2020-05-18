import styled from "styled-components";
import { vars as sVars } from "../../../globalStyles";

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: wrap;
  align-items: flex-start;
`;

export const GreyText = styled.span`
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  align-self: flex-end;
  padding-right: 15px;
  padding-top: 3px;
`;
