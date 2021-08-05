import React, { useCallback } from 'react';
import { Button, Tabs } from 'antd';
import ProfileCurrency from './components/ProfileCurrency/ProfileCurrency';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Style from './StyledSecondPage';
import { useHistory } from 'react-router-dom';

const SecondPage = (): JSX.Element => {
  const { TabPane } = Tabs;
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <>
      <Button type="ghost" onClick={handleGoBack}>
        Go Back
      </Button>
      <Style.Container>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <ProfilePage />
          </TabPane>
          <TabPane tab="Your Currency" key="2">
            <ProfileCurrency />
          </TabPane>
        </Tabs>
      </Style.Container>
    </>
  );
};

export default SecondPage;
