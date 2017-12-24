import { fromJS } from 'immutable';

import diagnosisFeaturePageReducer from '../reducer';
import {
  addDiagnosis, addDiagnosisError, addDiagnosisSuccess, diagnosisListLoaded, diagnosisListLoadError,
  getDiagnosisList,
} from '../actions';

describe('diagnosisFeaturePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      diagnosisList: [],
    });
  });
  it('returns the initial state', () => {
    expect(diagnosisFeaturePageReducer(undefined, {})).toEqual(state);
  });
  it('should handle add diagnosis success correctly', () => {
    const fixture = {
      date: '2017-12-12',
      diagnosis: 'Cancer',
      notice: 'This is notice',
    };
    const expectedResult = state.update('diagnosisList', (list) => list.push(fromJS(fixture)));
    expect(diagnosisFeaturePageReducer(state, addDiagnosisSuccess(fixture))).toEqual(expectedResult);
  });

  it('should handle diagnosis list success correctly', () => {
    const fixture = [{
      date: '2017-12-12',
      diagnosis: 'Cancer',
      notice: 'This is notice',
    }];
    const expectedResult = state.set('diagnosisList', fromJS(fixture));
    expect(diagnosisFeaturePageReducer(state, diagnosisListLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle diagnosis list correctly', () => {
    expect(diagnosisFeaturePageReducer(state, getDiagnosisList())).toEqual(state);
  });

  it('should handle add diagnosis correctly', () => {
    expect(diagnosisFeaturePageReducer(state, addDiagnosis({}))).toEqual(state);
  });

  it('should handle diagnosis list error correctly', () => {
    expect(diagnosisFeaturePageReducer(state, diagnosisListLoadError('Error!'))).toEqual(state);
  });

  it('should handle add diagnosis error correctly', () => {
    expect(diagnosisFeaturePageReducer(state, addDiagnosisError('Error!'))).toEqual(state);
  });
});
