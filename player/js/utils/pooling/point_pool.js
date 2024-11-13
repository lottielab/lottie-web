import poolFactory from './pool_factory';

const pointPool = (function () {
  function create() {
    return [0, 0] // createTypedArray('float32', 2);
  }
  return poolFactory(8, create);
}());

export default pointPool;
