import React from 'react';
import { shallow } from 'enzyme';
import _noop from 'lodash/noop';

import AddDiagnosis from '../index';
import AddDiagnosisForm from '../form';

describe('<AddDiagnosis />', () => {
  it('should render add diagnosis form', () => {
    const wrapper = shallow(<AddDiagnosis onCancel={_noop} onRequestAdd={_noop} />);
    expect(wrapper.find(AddDiagnosisForm)).toHaveLength(1);
  });
});
