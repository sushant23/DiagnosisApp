/**
 *
 * DiagnosisList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const AddDiagnosisModal = ({ isAddModalShown, addHandler }) => (
  <Modal isOpen={isAddModalShown} toggle={() => addHandler(false)}>
    <div>
      AddModal
    </div>
  </Modal>
);

AddDiagnosisModal.propTypes = {
  isAddModalShown: PropTypes.bool,
  addHandler: PropTypes.func.isRequired,
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
          <thead>
            <tr>
              <td>
                <FormattedMessage {...messages.date} />
              </td>

              <td>
                <FormattedMessage {...messages.diagnose} />
              </td>

              <td>
                <FormattedMessage {...messages.type} />
              </td>

              <td>
                <FormattedMessage {...messages.notes} />
              </td>

              <td>
                <FormattedMessage {...messages.actuary} />
              </td>
            </tr>
          </thead>
          <tbody>
            {
            data.map(
              ({ id, diagnosis, date, diagnoseType, notice, actuary: { firstName, lastName } }) => (<tr key={id}>
                <td>{date}</td>
                <td>{diagnosis}</td>
                <td>{diagnoseType}</td>
                <td>{notice}</td>
                <td>{`${firstName} ${lastName}`}</td>
              </tr>)
            )
          }
          </tbody>
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
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  })).isRequired,
  isAddModalShown: PropTypes.bool,
};

export default DiagnosisList;
