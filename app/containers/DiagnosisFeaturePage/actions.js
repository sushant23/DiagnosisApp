/*
 *
 * DiagnosisFeaturePage actions
 *
 */

import {
  ADD_DIAGNOSIS,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addDiagnosis(diagnosis) {
  return {
    type: ADD_DIAGNOSIS,
    diagnosis,
  };
}
