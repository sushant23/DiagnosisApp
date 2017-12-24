import { addDiagnosis } from '../actions';
import { ADD_DIAGNOSIS } from '../constants';

describe('DiagnosisFeaturePage actions', () => {
  describe('addDiagnosis', () => {
    it('should return correct diagnosis and type', () => {
      const fixture = {
        date: '2017-12-12',
        diagnosis: 'Cancer',
        notice: 'this is notice',
      };
      const expected = {
        type: ADD_DIAGNOSIS,
        diagnosis: fixture,
      };
      expect(addDiagnosis(fixture)).toEqual(expected);
    });
  });
});
