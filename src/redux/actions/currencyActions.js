import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCurrencySuccess(currencies) {
  return { type: types.LOAD_CURRENCIES_SUCCESS, currencies };
}

export function createCurrencySuccess(currency) {
  return { type: types.CREATE_CURRENCY_SUCCESS, currency };
}

export function updateCurrencySuccess(currency) {
  return { type: types.UPDATE_CURRENCY_SUCCESS, currency };
}

export function deleteCurrencyOptimistic(currency) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, currency };
}

export function loadCurrencies() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCurrencies()
      .then(Currencies => {
        dispatch(loadCurrencySuccess(currencies));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCurrency(currency) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCurrency(currency)
      .then(savedCurrency => {
        currency.id
          ? dispatch(updateCurrencySuccess(savedCurrency))
          : dispatch(createCurrencySuccess(savedCurrency));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCurrency(currency) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCurrencyOptimistic(currency));
    return courseApi.deleteEmployee(currency.id);
  };
}
