import styled from 'styled-components';
import { Color } from '@core/constants/colors';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    padding-top: 20px;
    background: ${Color.ConvertContainerColor};
    box-shadow: ${Color.ConverterContainerBoxShadow};
  `,
  AmountText: styled.span`
    font-size: 20px;
    font-weight: 900;
  `,
  Select: styled.div`
    width: 300px;
  `,
  Label: styled.label`
    font-size: 15px;
  `,
};

export default Styled;
