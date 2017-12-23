/**
 *
 * DiagnosisFeaturePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Dialog, RaisedButton as Button } from 'material-ui';
import _partial from 'lodash/partial';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import DiagnosisList from '../../components/DiagnosisList';
import { addDiagnosisAction } from './actions';

const data = JSON.parse('[{"id":6,"customer":{"id":1928},"diagnosis":"Cancer","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type 1"},{"id":7,"customer":{"id":1928},"diagnosis":"Diabetes type 1","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"C50.00&","diagnoseType":"Type c"},{"id":8,"customer":{"id":1928},"diagnosis":"E. coli","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type c"},{"id":9,"customer":{"id":1928},"diagnosis":"Dementia","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type c"},{"id":10,"customer":{"id":1928},"diagnosis":"Typhoid","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type B"},{"id":11,"customer":{"id":1928},"diagnosis":"Ebola","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type c"},{"id":12,"customer":{"id":1928},"diagnosis":"Diarrhea","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type c"},{"id":13,"customer":{"id":1928},"diagnosis":"Jaundice","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type 2"}]');

export class DiagnosisFeaturePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDiagnosisListShown: false,
      isAddModalShown: false,
    };
  }

  getDiagnosisListModal = () => {
    const { isDiagnosisListShown, isAddModalShown } = this.state;
    return (
      <Dialog
        open={isDiagnosisListShown}
        onRequestClose={() => this.setState({ isDiagnosisListShown: false })}
        autoScrollBodyContent
      >
        <DiagnosisList
          data={data}
          isAddModalShown={isAddModalShown}
          addHandler={(isShown) => this.setState({ isAddModalShown: isShown })}
          diagnosisSubmitHandler={this.submitDiagnosis}
        />
      </Dialog>
    );
  };

  submitDiagnosis= (formData) => {
    const { addDiagnosis } = this.props;
    const dataObj = formData.toJS();
    const date = dataObj.date;
    const day = dataObj.date && `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`;
    addDiagnosis({ ...dataObj, date: day });
  };

  render() {
    const { isDiagnosisListShown } = this.state;
    return (
      <div>
        <Helmet>
          <title>DiagnosisFeaturePage</title>
          <meta name="description" content="Description of DiagnosisFeaturePage" />
        </Helmet>
        <Button
          onClick={() => this.setState({ isDiagnosisListShown: true })}
        ><FormattedMessage {...messages.diagnosisList} /></Button>
        {isDiagnosisListShown && this.getDiagnosisListModal()}
      </div>
    );
  }
}

DiagnosisFeaturePage.propTypes = {
  addDiagnosis: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, _partial(bindActionCreators, { addDiagnosisAction }));
const withReducer = injectReducer({ key: 'diagnosisFeaturePage', reducer });
const withSaga = injectSaga({ key: 'diagnosisFeaturePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DiagnosisFeaturePage);
