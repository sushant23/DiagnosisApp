/*
 *
 * DiagnosisFeaturePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_DIAGNOSIS,
  ADD_DIAGNOSIS_ERROR,
  ADD_DIAGNOSIS_SUCCESS,
  DIAGNOSIS_LIST_LOAD_ERROR,
  DIAGNOSIS_LIST_LOADED,
  GET_DIAGNOSIS_LIST,
} from './constants';

const initialState = fromJS({
  diagnosisList: [],
});

function diagnosisFeaturePageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DIAGNOSIS:
      return state;

    case GET_DIAGNOSIS_LIST:
      return state;

    case ADD_DIAGNOSIS_ERROR:
      return state;

    case ADD_DIAGNOSIS_SUCCESS:
      return state.update('diagnosisList', (list) => list.push(fromJS(action.diagnosis)));

    case DIAGNOSIS_LIST_LOADED:
      return state.set('diagnosisList', fromJS(action.diagnosisList));

    case DIAGNOSIS_LIST_LOAD_ERROR:
      return state;
    default:
      return state;
  }
}

export default diagnosisFeaturePageReducer;
