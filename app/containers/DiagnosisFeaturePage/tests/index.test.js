import React from 'react';
import { shallow } from 'enzyme';

import { DiagnosisFeaturePage } from '../index';
import DiagnosisList from '../../../components/DiagnosisList/index';

describe('<DiagnosisFeaturePage />', () => {
  it('should render diagnosis list dialog if state isDiagnosisListShown true', () => {
    const wrapper = shallow(
      <DiagnosisFeaturePage
        addDiagnosis={() => {}}
        getDiagnosisList={() => {}}
        diagnosisList={[]}
      />
    );
    wrapper.setState({ isDiagnosisListShown: true });
    expect(wrapper.find(DiagnosisList)).toHaveLength(1);
  });
});
