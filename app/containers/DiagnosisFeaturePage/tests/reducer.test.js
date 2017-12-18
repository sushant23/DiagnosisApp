
import { fromJS } from 'immutable';
import diagnosisFeaturePageReducer from '../reducer';

describe('diagnosisFeaturePageReducer', () => {
  it('returns the initial state', () => {
    expect(diagnosisFeaturePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
