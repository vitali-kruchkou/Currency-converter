import styled from 'styled-components';

const Style = {
  Container: styled.div`
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    & > div > div:nth-child(1) {
      margin: 0 auto;
      width: 200px;
    }
  `,
};

export default Style;
