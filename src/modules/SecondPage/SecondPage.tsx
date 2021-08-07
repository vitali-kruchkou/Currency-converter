import React, { useCallback } from 'react';
import { Button, Tabs } from 'antd';
import ProfileCurrency from './components/ProfileCurrency/ProfileCurrency';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Style from './StyledSecondPage';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SecondPage = (): JSX.Element => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const { t } = useTranslation();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <>
      <Button type="primary" onClick={handleGoBack}>
        {t('secondPage.buttonGoBack')}
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
