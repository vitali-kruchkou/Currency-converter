import styled from 'styled-components';
import { Color } from '@core/constants/colors';
import { Adaptive } from '@core/constants/adaptive';

const Style = {
  Container: styled.div`
    max-width: 500px;
    max-height: 650px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    & > button:nth-child(1) {
      margin-bottom: 10px;
    }
  `,
  Lists: styled.ul`
    list-style: none;
    background: ${Color.CurrentListPageBG};
    width: 500px;
    color: ${Color.CurrentListPageColorText};
    font-size: 20px;
    font-weight: 900;
    font-family: Courier New, monospace;
    padding: 0;
    max-height: 500px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    @media (max-width: ${Adaptive.notebook}) {
      max-width: 400px;
      font-size: 18px;
    }
    @media (max-width: ${Adaptive.smartphone}) {
      max-width: 300px;
      font-size: 18px;
    }
  `,
  List: styled.li`
    width: 400px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border: ${Color.CurrentListPageBorder};
    margin: 5px auto;
    text-align: center;
    & > p {
      margin: 0;
    }
    @media (max-width: ${Adaptive.notebook}) {
      max-width: 300px;
      max-height: 40px;
    }
  `,
  Input: styled.div`
    max-width: 300px;
    margin: 10px auto;
  `,
  Buttons: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
};

export default Style;
