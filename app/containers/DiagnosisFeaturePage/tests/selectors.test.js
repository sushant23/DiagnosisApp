import { fromJS } from 'immutable';
import { selectDiagnosisFeaturePageDomain, selectDiagnosisList } from '../selectors';

describe('selectDiagnosisFeaturePageDomain', () => {
  it('should select the diagnosis feature state', () => {
    const diagnosisFeatureState = fromJS({
      diagnosisList: [],
    });
    const mockedState = fromJS({
      diagnosisFeaturePage: diagnosisFeatureState,
    });
    expect(selectDiagnosisFeaturePageDomain(mockedState)).toEqual(diagnosisFeatureState);
  });
});

describe('selectDiagnosisFeature', () => {
  const diagnosisListSelector = selectDiagnosisList();
  it('should select the diagnosis feature state', () => {
    const diagnosisList = [{
      date: '2017-11-11',
      diagnosis: 'Cancer',
      notice: 'hello',
    }];
    const mockedState = fromJS({
      diagnosisFeaturePage: { diagnosisList },
    });
    expect(diagnosisListSelector(mockedState)).toEqual(diagnosisList);
  });
});
