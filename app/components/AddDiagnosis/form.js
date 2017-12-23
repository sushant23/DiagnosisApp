import React from 'react';
import PropTypes from 'prop-types';
import Field from 'redux-form/es/immutable/Field';
import reduxForm from 'redux-form/es/immutable/reduxForm';
import { DatePicker, TextField } from 'redux-form-material-ui';
import { FlatButton as Button } from 'material-ui';


const DiagnosisForm = ({ handleSubmit, onCancel }) => (<form onSubmit={handleSubmit}>
  <div>
    <Field
      fullWidth
      name="date"
      format={null}
      component={DatePicker}
      floatingLabelText="Date of diagnose"
    />
  </div>

  <div>
    <Field
      fullWidth
      name="diagnosis"
      component={TextField}
      floatingLabelText="Diagnose"
    />
  </div>

  <div>
    <Field
      fullWidth
      name="notice"
      component={TextField}
      floatingLabelText="Notes"
    />
  </div>
  <Button onClick={onCancel}>Cancel</Button>
  <Button primary type="submit">Submit</Button>
</form>
);

DiagnosisForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
export default reduxForm({
  form: 'diagnosis',
})(DiagnosisForm);
