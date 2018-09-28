// import {
//   compose,
//   findIndex,
//   propEq,
//   map,
//   update
// } from 'ramda';
import * as R from 'ramda';

/**
 * pred (function): R.propEq(key, value)
 * inputLens (function): R.lensProp(propName)
 * entities (functor): Acronyms array
 **/
const customLens = pred => inputLens => entities => {
    const index = R.findIndex(pred, entities);
    return R.map(
      entity => R.update(index, entity, entities),
      inputLens(entities[index])
    );
};

export const lensBy_Id = R.compose(customLens, R.propEq('_id'));
export const lensById = R.compose(customLens, R.propEq('id'));
