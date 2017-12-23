/*
 *
 * DiagnosisFeaturePage actions
 *
 */

import {
  ADD_DIAGNOSIS, ADD_DIAGNOSIS_ERROR, ADD_DIAGNOSIS_SUCCESS,
  DEFAULT_ACTION, DIAGNOSIS_LIST_LOAD_ERROR, DIAGNOSIS_LIST_LOADED, GET_DIAGNOSIS_LIST,
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

export function getDiagnosisList() {
  return {
    type: GET_DIAGNOSIS_LIST,
  };
}

export function diagnosisListLoaded(diagnosisList) {
  return {
    type: DIAGNOSIS_LIST_LOADED,
    diagnosisList,
  };
}

export function diagnosisListLoadError(error) {
  return {
    type: DIAGNOSIS_LIST_LOAD_ERROR,
    error,
  };
}

export function addDiagnosisSuccess(diagnosis) {
  return {
    type: ADD_DIAGNOSIS_SUCCESS,
    diagnosis,
  };
}

export function addDiagnosisError(error) {
  return {
    type: ADD_DIAGNOSIS_ERROR,
    error,
  };
}
