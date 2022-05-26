/**
 * Default tags used by the cacher helpers
 */
const defaultTags = ['UNAUTHORIZED', 'UNKNOWN_ERROR'];

function concatErrorCache(existingCache, error) {
  if (error && 'status' in error && error.status === 401) {
    // unauthorized error
    return [...existingCache, 'UNAUTHORIZED'];
  }

  // unknown error
  return [...existingCache, 'UNKNOWN_ERROR'];
}

/**
 * HOF to create an entity cache to provide a LIST,
 * depending on the results being in a common format.
 *
 * Will not provide individual items without a result.
 *
 * @example
 * ```ts
 * const results = [
 *   { id: 1, message: 'foo' },
 *   { id: 2, message: 'bar' }
 * ]
 * providesList('Todo')(results)
 * // [
 * //   { type: 'Todo', id: 'List'},
 * //   { type: 'Todo', id: 1 },
 * //   { type: 'Todo', id: 2 },
 * // ]
 * ```
 */
export const providesList =
  (type, resultsParser = (results) => results) =>
  (results, error) => {
    // console.log(type);
    // console.log(results);
    // console.log(error);
    // is result available?
    if (results) {
      const parsedResults = resultsParser(results);
      // const parsedResults = results;
      // successful query
      return [{ type, id: 'LIST' }, ...parsedResults.map(({ id }) => ({ type, id }))];
    }
    // Received an error, include an error cache item to the cache list
    // console.log(concatErrorCache([{ type, id: 'LIST' }], error));
    return concatErrorCache([{ type, id: 'LIST' }], error);
  };

export const providesSimpleList = ({type, id}) => (results, error) => {
  if (results) {
    return [{ type, id }];
  }
  // Received an error, include an error cache item to the cache list
  // console.log(concatErrorCache([{ type, id: 'LIST' }], error));
  return concatErrorCache([{ type, id }], error);
};

/**
 * HOF to create an entity cache to invalidate a LIST.
 *
 * Invalidates regardless of result.
 *
 * @example
 * ```ts
 * invalidatesList('Todo')()
 * // [{ type: 'Todo', id: 'List' }]
 * ```
 */
export const invalidatesList = (type) => () => [{ type, id: 'LIST' }];

/**
 * Similar to `providesList`, but for data located at a nested property,
 * e.g. `results.data` in a paginated response.
 * The property is hard coded, so re-create a version of this function based
 * on a data shape your API returns for best results.
 */
export const providesNestedList = (type) => (results, error) => {
  // console.log(results);
  // is result available?
  if (results) {
    // console.log([{ type, id: 'LIST' }, ...results[type].map(({ id }) => ({ type, id }))]);
    // successful query
    return [{ type, id: 'LIST' }, ...results[type].map(({ id }) => ({ type, id }))];
  }
  // Received an error, include an error cache item to the cache list
  return concatErrorCache([{ type, id: 'LIST' }], error);
};

/**
 * HOF to create an entity cache for a single item using the query argument as the ID.
 *
 * @example
 * ```ts
 * cacheByIdArg('Todo')({ id: 5, message: 'walk the fish' }, undefined, 5)
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArg = (type) => (result, error, id) => [{ type, id }];

/**
 * HOF to create an entity cache for a single item using the id property from the query argument as the ID.
 *
 * @example
 * ```ts
 * cacheByIdArgProperty('Todo')(undefined, { id: 5, message: 'sweep up' })
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArgProperty = (type) => (result, error, arg) => [{ type, id: arg.uuid }];

/**
 * HOF to invalidate the 'UNAUTHORIZED' type cache item.
 */
export const invalidatesUnauthorized = (result, error, arg) => ['UNAUTHORIZED'];

/**
 * HOF to invalidate the 'UNKNOWN_ERROR' type cache item.
 */
export const invalidatesUnknownErrors = (result, error, arg) => ['UNKNOWN_ERROR'];

/**
 * Utility helpers for common provides/invalidates scenarios
 */
export const cacher = {
  defaultTags,
  providesList,
  invalidatesList,
  providesNestedList,
  cacheByIdArg,
  cacheByIdArgProperty,
  invalidatesUnauthorized,
  invalidatesUnknownErrors,
  providesSimpleList
};
