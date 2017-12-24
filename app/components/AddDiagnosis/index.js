/**
*
* AddDiagnosis
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import AddDiagnosisForm from './form';

function AddDiagnosis({ onCancel, onRequestAdd }) {
  return (
    <div>
      <AddDiagnosisForm onCancel={onCancel} onSubmit={onRequestAdd} />
    </div>
  );
}

AddDiagnosis.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onRequestAdd: PropTypes.func.isRequired,
};

export default AddDiagnosis;
