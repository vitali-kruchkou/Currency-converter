import { CurrencyState, CurrencyActions } from '@type/types';
import { ActionTypes } from '@store/actions/constans.d';

const initialState: CurrencyState = {
  data: null as null,
  course: null as null,
};

const currentConverter = (
  state: CurrencyState = initialState,
  action: CurrencyActions,
): CurrencyState => {
  switch (action.type) {
    case ActionTypes.GET_CURRENCY_LIST: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case ActionTypes.GET_CURRENCY_COURSE: {
      return {
        ...state,
        course: action.payload,
      };
    }
    default:
      return state;
  }
};

export default currentConverter;
