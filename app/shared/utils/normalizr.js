import { normalize, arrayOf } from 'normalizr';
import { dataByKey } from './../data-types';

export const normalizeResponse = (dataType, response) => normalize(
  { [dataType]: Array.isArray(response) ? response : [response] },
  { [dataType]: arrayOf(dataByKey[dataType].schema) }
);
