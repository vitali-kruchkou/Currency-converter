import { addCurrencyList } from '@firebaseConfig/index';
import React, { useCallback, useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './StyledProfileCurrency';
import { Button, Input } from 'antd';
import { FindCoursePlaceholder, noSort, sortA_Z, sortZ_A } from './constants';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import i18n from '@core/i18n';
import { asyncGetCurrencyListFirabseAction } from '@store/actions/converterActions';
import {
  FavouriteCourseSelector,
  UserSelecotor,
} from '@store/selectors/selectors';

const ProfileCurrency = (): JSX.Element => {
  const [favCurrency, setFavCurrency] = useState<Array<string>>([]);
  const user = useSelector(UserSelecotor);
  const [counter, setCounter] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<Array<string>>([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favcor = useSelector(FavouriteCourseSelector);

  useEffect(() => {
    dispatch(asyncGetCurrencyListFirabseAction(user));
  }, [user, dispatch]);

  useEffect(() => {
    favcor && setFavCurrency(favcor);
  }, [favcor]);

  const handleSortzA_Z = useCallback(() => {
    const sorted = [...favCurrency].sort((a, b) =>
      a.split(' ')[1].localeCompare(b.split(' ')[1]),
    );
    setFavCurrency(sorted);
  }, [favCurrency]);

  const handleSortzZ_A = useCallback(() => {
    const sorted = [...favCurrency].sort((a, b) =>
      b.split(' ')[1].localeCompare(a.split(' ')[1]),
    );
    setFavCurrency(sorted);
  }, [favCurrency]);

  const handleNoSort = useCallback(() => {
    dispatch(asyncGetCurrencyListFirabseAction(user));
  }, [user, dispatch]);

  const handleSortButton = useCallback(() => {
    let count = counter;
    count = count !== 2 ? count + 1 : 0;
    setCounter(count);
    switch (counter) {
      case 0: {
        handleSortzA_Z();
        break;
      }
      case 1: {
        handleSortzZ_A();
        break;
      }
      case 2: {
        handleNoSort();
        break;
      }
      default: {
        return;
      }
    }
  }, [counter, handleSortzA_Z, handleSortzZ_A, handleNoSort]);

  const handleInputValue = useCallback(event => {
    event.preventDefault();
    const searhCurrency = event.target.value;
    setSearch(searhCurrency);
  }, []);

  useEffect(() => {
    const filterCoursesList = favCurrency.filter(item => {
      return (
        item.split(' ')[1].toLowerCase().includes(search) ||
        item.split(' ')[1].includes(search)
      );
    });
    setFilterCourse(filterCoursesList);
  }, [favCurrency, search]);

  const handleDelete = useCallback(
    (index: number) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const taskList: string[] = [...filterCourse];
      taskList.splice(index, 1);
      setFilterCourse(taskList);
      addCurrencyList(taskList, user);
      toast.success(`${i18n.t('toasts.deleteFromFavoriteCurrency')}`);
      dispatch(asyncGetCurrencyListFirabseAction(user));
    },
    [filterCourse, user, dispatch],
  );

  return (
    <>
      <Style.Container>
        <Button type="primary" onClick={handleSortButton}>
          {counter === 0 ? noSort : counter === 1 ? sortA_Z : sortZ_A}
        </Button>
        <Style.Input>
          <Input
            placeholder={FindCoursePlaceholder}
            type="text"
            onChange={handleInputValue}
          />
        </Style.Input>
        <Style.Lists>
          {favCurrency && favCurrency.length > 0 ? (
            filterCourse.map((item, index) => (
              <Style.List key={item.split(' ')[3]}>
                {item}
                <Button type="primary" danger onClick={handleDelete(index)}>
                  {' '}
                  X
                </Button>
              </Style.List>
            ))
          ) : (
            <div>{t('currentList.noFavCurrency')}</div>
          )}
        </Style.Lists>
      </Style.Container>
    </>
  );
};

export default ProfileCurrency;
