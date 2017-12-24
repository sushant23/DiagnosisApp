import { createSelector } from 'reselect';

/**
 * Direct selector to the diagnosisFeaturePage state domain
 */
const selectDiagnosisFeaturePageDomain = (state) => state.get('diagnosisFeaturePage');

/**
 * Other specific selectors
 */
const selectDiagnosisList = () => createSelector(
  selectDiagnosisFeaturePageDomain,
  (substate) => substate.get('diagnosisList').toJS()
);

export {
  selectDiagnosisFeaturePageDomain,
  selectDiagnosisList,
};
