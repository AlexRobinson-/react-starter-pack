import { normalize, arrayOf } from 'normalizr';
import { getDataByKey } from './../data-types';

export const normalizeResponse = (dataType, response) => {
  const type = getDataByKey[dataType];

  if (!type) {
    return { entities: {}, result: {} };
  }

  return normalize(
    { [dataType]: Array.isArray(response) ? response : [response] },
    { [dataType]: arrayOf(type.schema) }
  );
};
