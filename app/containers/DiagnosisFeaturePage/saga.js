/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_DIAGNOSIS, GET_DIAGNOSIS_LIST } from './constants';
import { addDiagnosisError, addDiagnosisSuccess, diagnosisListLoaded, diagnosisListLoadError } from './actions';

/**
 * Github repos request/response handler
 */
export function* getDiagnosisList() {
  // Select username from store
  const requestURL = 'http://dbtest.domacare.fi:5000/diagnoses?expand=author';

  try {
    // Call our request helper (see 'utils/request')
    const diagnosisList = yield call(request, requestURL);
    yield put(diagnosisListLoaded(diagnosisList));
  } catch (err) {
    yield put(diagnosisListLoadError(err));
  }
}

export function* addDiagnosis({ diagnosis }) {
  const requestURL = 'http://dbtest.domacare.fi:5000/diagnoses';

  try {
    // Call our request helper (see 'utils/request')
    const diagnosisResp = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diagnosis),
    });
    yield put(addDiagnosisSuccess(diagnosisResp));
  } catch (err) {
    yield put(addDiagnosisError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield all([
    takeLatest(GET_DIAGNOSIS_LIST, getDiagnosisList),
    takeLatest(ADD_DIAGNOSIS, addDiagnosis),
  ]);
}
