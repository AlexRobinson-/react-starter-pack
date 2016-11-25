import todo from './todo';

const data = [todo];

const dataByKey = data.reduce((byKey, data) => ({
  ...byKey,
  [data.schema.getKey()]: data
}), {});

export default {
  todo
};

export {
  dataByKey
};
