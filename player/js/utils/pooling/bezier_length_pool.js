import {
  getDefaultCurveSegments,
} from '../common';
import {
  createSizedArray,
} from '../helpers/arrays';
import poolFactory from './pool_factory';

const bezierLengthPool = (function () {
  function create() {
    return {
      addedLength: 0,
      percents: createSizedArray(getDefaultCurveSegments()),
      lengths: createSizedArray(getDefaultCurveSegments()),
    };
  }
  return poolFactory(8, create);
}());

export default bezierLengthPool;
