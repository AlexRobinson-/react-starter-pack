/**
 * This helper allows actions to pass in either an id or an object {id, dataType} when deleting an item.
 *
 * @param item
 * @param defaultDataType
 */
export const getInfo = (item, defaultDataType) => typeof item === 'object'
  ? item
  : { id: item, dataType: defaultDataType };
