import {
  addData
} from './item-actions';
import { ADD_DATA } from './../constants/action-types';

describe('#addData', () => {

  let result;
  let data;

  beforeEach(() => {
    data = [{ id: 123 }];
    result = addData('TODO_TYPE', data, false);
  });

  it(`should contain action type of ${ADD_DATA}`, () => {
    expect(result)
      .to.have.property('type')
      .which.equals(ADD_DATA);
  });

  it('should contain a dataType', () => {
    expect(result)
      .to.have.property('payload')
      .which.has.property('dataType')
      .which.equals('TODO_TYPE');
  });

  context('when not normalizing data', () => {
    it('should have raw data as data payload', () => {
      expect(result.payload.data)
        .to.deep.equal(data);
    })
  });

  context('when normalizing data', () => {
    beforeEach(() => {
      result = addData('TODO_TYPE', data, true);
    });

    it('should have raw data as data payload', () => {
      expect(result.payload.data)
        .to.have.property('entities');
      expect(result.payload.data)
        .to.have.property('result');
    });
  });

  it('should contain containsNormalizedData meta data', () => {
    expect(result)
      .to.have.property('meta')
      .which.has.property('containsNormalizedData')
      .which.is.true;
  });

});
