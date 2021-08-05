/* eslint-disable @typescript-eslint/no-explicit-any */
import { asyncGetCurrencyCourseListAction } from '@store/actions/converterActions';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { noSort, sortZ_A, sortA_Z } from '../constants';

interface SortButtonProps {
  coursesList: string[] | number[] | any[];
  setCoursesList: (value: string[]) => void;
}

const SortButton = ({
  coursesList,
  setCoursesList,
}: SortButtonProps): JSX.Element => {
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const handleSortzA_Z = useCallback(() => {
    const sorted = [...coursesList].sort((a, b) =>
      a.Cur_Abbreviation[0].localeCompare(b.Cur_Abbreviation[0]),
    );
    setCoursesList(sorted);
  }, [coursesList, setCoursesList]);

  const handleSortzZ_A = useCallback(() => {
    const sorted = [...coursesList].sort((a, b) =>
      b.Cur_Abbreviation[0].localeCompare(a.Cur_Abbreviation[0]),
    );
    setCoursesList(sorted);
  }, [coursesList, setCoursesList]);

  const handleNoSort = useCallback(() => {
    dispatch(asyncGetCurrencyCourseListAction());
  }, [dispatch]);

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

  return (
    <Button type="primary" onClick={handleSortButton}>
      {counter === 0 ? noSort : counter === 1 ? sortA_Z : sortZ_A}
    </Button>
  );
};

export default SortButton;
