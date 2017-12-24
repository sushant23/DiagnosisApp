import { fromJS } from 'immutable';

import diagnosisFeaturePageReducer from '../reducer';

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
});
