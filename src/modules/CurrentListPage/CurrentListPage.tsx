import { AuthRoutes } from '@core/constants/routes';
import i18n from '@core/i18n';
import { addCurrencyList } from '@firebaseConfig/index';
import { asyncGetCurrencyCourseListAction } from '@store/actions/converterActions';
import { UserSelecotor } from '@store/selectors/selectors';
import { CourseListItem } from '@type/types';
import { Button, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SortButton from './Buttons/SortButton';
import {
  FindCoursePlaceholder,
  defaultInitialValue,
  defaultCurrency,
} from './constants';
import Style from './StyledCurrentListPage';

const CurrentList = (): JSX.Element => {
  const [coursesList, setCoursesList] = useState([]);
  const [chooseCourse, setChooseCourse] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState([]);
  const [selected, setSelected] = useState([]);
  const history = useHistory();
  const { t } = useTranslation();
  const today = new Date();

  const user = useSelector(UserSelecotor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetCurrencyCourseListAction());
  }, [dispatch]);

  const getCourseList = useSelector(
    (state: RootStateOrAny) => state.currentConverter.courseList,
  );

  useEffect(() => {
    if (getCourseList) {
      setCoursesList(getCourseList);
    }
  }, [getCourseList]);

  const handleCourseList = useCallback(event => {
    setChooseCourse(prevState => [
      ...prevState,
      event.target.parentNode.innerText.split('+')[0],
    ]);
    toast.success(`${i18n.t('toasts.addFavoriteCurrency')}`);
  }, []);

  useEffect(() => {
    const arr = [...chooseCourse].map(item => item.split(' ')[1]);
    setSelected(arr);
  }, [chooseCourse]);

  const handleInputValue = useCallback(event => {
    event.preventDefault();
    const searhCurrency = event.target.value;
    setSearch(searhCurrency);
  }, []);

  useEffect(() => {
    const filterCoursesList = coursesList.filter(item => {
      return (
        item.Cur_Abbreviation.toLowerCase().includes(search) ||
        item.Cur_Abbreviation.includes(search)
      );
    });
    setFilterCourse(filterCoursesList);
  }, [coursesList, search]);

  useEffect(() => {
    addCurrencyList(chooseCourse, user);
  }, [chooseCourse, user]);

  const historyGoBackToConverter = useCallback(() => {
    history.push(AuthRoutes.convert);
  }, [history]);

  const historyGoProfile = useCallback(() => {
    history.push(AuthRoutes.profile);
  }, [history]);

  return (
    <>
      <Style.Buttons>
        <Button type="ghost" onClick={historyGoBackToConverter}>
          {t('currentList.currentListButtonGoBack')}
        </Button>
        <Button type="ghost" onClick={historyGoProfile}>
          {t('currentList.currentListButtonGoProfilePage')}
        </Button>
      </Style.Buttons>
      <Style.Container>
        <SortButton coursesList={coursesList} setCoursesList={setCoursesList} />
        <Style.Input>
          <Input
            placeholder={FindCoursePlaceholder}
            type="text"
            onChange={handleInputValue}
          />
        </Style.Input>
        <h1>
          {t('currentList.course')} {today.toLocaleDateString()}
        </h1>
        <Style.Lists>
          {coursesList &&
            filterCourse.map((item: CourseListItem) => (
              <Style.List
                key={item.Cur_ID}
                className={
                  selected.includes(item.Cur_Abbreviation)
                    ? 'Active'
                    : undefined
                }>
                {defaultInitialValue} {item.Cur_Abbreviation} ={' '}
                {item.Cur_OfficialRate} {defaultCurrency}
                <button onClick={handleCourseList}>+</button>
              </Style.List>
            ))}
        </Style.Lists>
      </Style.Container>
    </>
  );
};

export default CurrentList;
