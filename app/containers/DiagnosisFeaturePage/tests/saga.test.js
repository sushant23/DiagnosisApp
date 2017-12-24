/**
 * Test  sagas
 */

import { put, takeLatest, all } from 'redux-saga/effects';
import diagnosisSagas, { addDiagnosis, getDiagnosisList } from '../saga';
import { addDiagnosisError, addDiagnosisSuccess, diagnosisListLoaded, diagnosisListLoadError } from '../actions';
import { ADD_DIAGNOSIS, GET_DIAGNOSIS_LIST } from '../constants';

/* eslint-disable redux-saga/yield-effects */
describe('get diagnosis Saga', () => {
  let getDiagnosisListGenerator;
  beforeEach(() => {
    getDiagnosisListGenerator = getDiagnosisList();
    const callDescriptor = getDiagnosisListGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });
  it('should dispatch diagnosis list load success action if data is fetched successfully', () => {
    const response = JSON.parse('[{"id":6,"customer":{"id":1928},"diagnosis":"Cancer","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"","diagnoseType":"Type 1"},{"id":7,"customer":{"id":1928},"diagnosis":"Diabetes type 1","date":"2011-12-19","notice":"this is notice 1","deleted":false,"actuary":{"id":13,"userId":"a","firstName":"John","lastName":"Doe","assignment":"test assignment","phoneNumber":"54899554712","email":"john@company.com","unitId":5,"unit":{"id":5},"creator":{},"removed":false,"workTimeBegin":"2000-01-01T00:00:00","workTimeEnd":"2000-01-01T23:59:59","alwaysUsed":false,"deletingUser":{},"socialSecurityNumber":"548854A","modifyingUserId":13,"modifyingUser":{"id":13},"resolveAddress":false,"costPerHour":0,"externalId":13},"actuaryInfo":"Doe John","code":"C50.00&","diagnoseType":"Type c"}]');
    const putDescriptor = getDiagnosisListGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(diagnosisListLoaded(response)));
  });

  it('should call the diagnosis list load error action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getDiagnosisListGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(diagnosisListLoadError(response)));
  });
});

describe('add diagnosis saga', () => {
  const diagnosis = {
    date: '2017-12-12',
    diagnosis: 'Cancer',
    notice: 'Hello',
  };
  let addDiagnosisGenerator;
  beforeEach(() => {
    addDiagnosisGenerator = addDiagnosis({ diagnosis });
    const callDescriptor = addDiagnosisGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });
  it('should dispatch diagnosis add success action if data is added successfully', () => {
    const putDescriptor = addDiagnosisGenerator.next(diagnosis).value;
    expect(putDescriptor).toEqual(put(addDiagnosisSuccess(diagnosis)));
  });

  it('should dispatch diagnosis add error action if response errors', () => {
    const response = new Error('some error');
    const putDescriptor = addDiagnosisGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(addDiagnosisError(response)));
  });
});

describe('diagnosis Sagas', () => {
  const diagnosisDataSagas = diagnosisSagas();

  it('should start task to watch for GET_DIAGNOSIS_LIST and ADD_DIAGNOSIS action', () => {
    const takeLatestAllDescriptor = diagnosisDataSagas.next().value;
    expect(takeLatestAllDescriptor).toEqual(all([
      takeLatest(GET_DIAGNOSIS_LIST, getDiagnosisList),
      takeLatest(ADD_DIAGNOSIS, addDiagnosis),
    ]));
  });
});
