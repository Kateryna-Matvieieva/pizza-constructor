import styled from 'styled-components';
import { vars as sVars } from '../../../globalStyles';

const InfoBlock = styled.div`
  padding: 0 2.5%;
  display: flex;
  flex-direction: column;
  & > h3 {
    color: ${sVars.color2};
    margin: 0 0 30px 0;
    text-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px;
    letter-spacing: 0.1em;
    font-size: 1.3rem;
    font-weight: 400;
  }
  & > a {
    margin-top: 50px;
    width: fit-content;
  }
  & > p {
    margin: 30px 0 0 0;
    color: ${sVars.color2};
    text-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px;
    letter-spacing: 0.1em;
    font-size: 1.3rem;
    align-self: center;
  }
`;

export default InfoBlock;
