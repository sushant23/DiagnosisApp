/**
 *
 * DiagnosisList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Dialog,
  FlatButton as Button,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';

import messages from './messages';
import AddDiagnosis from '../AddDiagnosis';

const AddDiagnosisModal = ({ isAddModalShown, addHandler, diagnosisSubmitHandler }) => (
  <Dialog open={isAddModalShown} onRequestClose={() => addHandler(false)}>
    <AddDiagnosis onCancel={() => addHandler(false)} onRequestAdd={diagnosisSubmitHandler} />
  </Dialog>
);

AddDiagnosisModal.propTypes = {
  isAddModalShown: PropTypes.bool,
  addHandler: PropTypes.func.isRequired,
  diagnosisSubmitHandler: PropTypes.func.isRequired,
};

AddDiagnosisModal.defaultProps = {
  isAddModalShown: false,
};


function DiagnosisList({ data, addHandler, isAddModalShown, diagnosisSubmitHandler }) {
  return (
    <div>
      <div>
        <FormattedMessage {...messages.header} />
        <Button
          onClick={() => addHandler(true)}
          className="pull-right"
        ><FormattedMessage {...messages.addNow} /></Button>
      </div>
      {
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                <FormattedMessage {...messages.date} />
              </TableHeaderColumn>

              <TableHeaderColumn>
                <FormattedMessage {...messages.diagnose} />
              </TableHeaderColumn>

              <TableHeaderColumn>
                <FormattedMessage {...messages.type} />
              </TableHeaderColumn>

              <TableHeaderColumn>
                <FormattedMessage {...messages.notes} />
              </TableHeaderColumn>

              <TableHeaderColumn>
                <FormattedMessage {...messages.actuary} />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              data.map(
                ({ id, diagnosis, date, diagnoseType, notice, actuary }) => (<TableRow key={id}>
                  <TableRowColumn>{date}</TableRowColumn>
                  <TableRowColumn>{diagnosis}</TableRowColumn>
                  <TableRowColumn>{diagnoseType}</TableRowColumn>
                  <TableRowColumn>{notice}</TableRowColumn>
                  {actuary && <TableRowColumn>{`${actuary.firstName} ${actuary.lastName}`}</TableRowColumn>}
                </TableRow>)
              )
            }
          </TableBody>
        </Table>
      }

      {isAddModalShown && <AddDiagnosisModal
        diagnosisSubmitHandler={diagnosisSubmitHandler}
        isAddModalShown={isAddModalShown}
        addHandler={addHandler}
      />}
    </div>
  );
}

DiagnosisList.propTypes = {
  addHandler: PropTypes.func.isRequired,
  diagnosisSubmitHandler: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    diagnosis: PropTypes.string.isRequired,
    diagnoseType: PropTypes.string.isRequired,
    notice: PropTypes.string.isRequired,
    actuary: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  })).isRequired,
  isAddModalShown: PropTypes.bool,
};

export default DiagnosisList;
