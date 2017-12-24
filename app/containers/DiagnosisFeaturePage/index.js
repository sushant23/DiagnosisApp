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
import _noop from 'lodash/noop';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import DiagnosisList from '../../components/DiagnosisList';
import { addDiagnosis as addDiagnosisAction, getDiagnosisList } from './actions';
import { selectDiagnosisList } from './selectors';


export class DiagnosisFeaturePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDiagnosisListShown: false,
      isAddModalShown: false,
    };
  }

  componentWillMount() {
    this.props.getDiagnosisList();
  }

  getDiagnosisListModal = () => {
    const { isDiagnosisListShown, isAddModalShown } = this.state;
    const { diagnosisList } = this.props;
    return (
      <Dialog
        open={isDiagnosisListShown}
        onRequestClose={() => this.setState({ isDiagnosisListShown: false })}
        autoScrollBodyContent
      >
        <DiagnosisList
          data={diagnosisList}
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
    this.setState({ isAddModalShown: false });
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
  getDiagnosisList: PropTypes.func.isRequired,
  diagnosisList: PropTypes.array.isRequired,
};

DiagnosisFeaturePage.defaultProps = {
  addDiagnosis: _noop,
  getDiagnosisList: _noop,
  diagnosisList: [],
};

const mapStateToProps = createStructuredSelector({
  diagnosisList: selectDiagnosisList(),
});

const withConnect = connect(mapStateToProps, _partial(bindActionCreators, { addDiagnosis: addDiagnosisAction, getDiagnosisList }));
const withReducer = injectReducer({ key: 'diagnosisFeaturePage', reducer });
const withSaga = injectSaga({ key: 'diagnosisFeaturePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DiagnosisFeaturePage);
