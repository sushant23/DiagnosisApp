import { createSelector } from 'reselect';

/**
 * Direct selector to the diagnosisFeaturePage state domain
 */
const selectDiagnosisFeaturePageDomain = (state) => state.get('diagnosisFeaturePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DiagnosisFeaturePage
 */

const makeSelectDiagnosisFeaturePage = () => createSelector(
  selectDiagnosisFeaturePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectDiagnosisFeaturePage;
export {
  selectDiagnosisFeaturePageDomain,
};
