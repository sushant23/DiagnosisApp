import React from 'react';
import { shallow } from 'enzyme';
import _noop from 'lodash/noop';

import DiagnosisList, { AddDiagnosisModal } from '../index';
import AddDiagnosis from '../../AddDiagnosis/index';

describe('<DiagnosisList />', () => {
  it('should show AddDiagnosisModal if isAddModalShown prop is present', () => {
    const wrapper = shallow(
      <DiagnosisList addHandler={_noop} diagnosisSubmitHandler={_noop} data={[]} isAddModalShown />
    );
    expect(wrapper.find(AddDiagnosisModal)).toHaveLength(1);
  });

  it('should render data according to the prop passed', () => {
    const wrapper = shallow(
      <DiagnosisList
        addHandler={_noop}
        diagnosisSubmitHandler={_noop}
        data={[{
          id: 1,
          date: '2017-11-11',
          diagnosis: 'Cancer',
          notice: 'hello',
          actuary: {
            id: 1,
            firstName: 'Sushant',
            lastName: 'Devkota',
          },
        }]}
      />
    );
    expect(wrapper.contains('2017-11-11')).toBe(true);
    expect(wrapper.contains('Cancer')).toBe(true);
    expect(wrapper.contains('hello')).toBe(true);
    expect(wrapper.contains('Sushant Devkota')).toBe(true);
  });

  it('should render AddDiagnosis if AddDiagnosisModal has isAddModalShown prop present', () => {
    const wrapper = shallow(
      <AddDiagnosisModal addHandler={_noop} diagnosisSubmitHandler={_noop} isAddModalShown />
    );
    expect(wrapper.find(AddDiagnosis)).toHaveLength(1);
  });
});
