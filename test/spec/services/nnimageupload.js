'use strict';

describe('Service: nnImageUpload', function () {

  // load the service's module
  beforeEach(module('nightlynachosApp'));

  // instantiate service
  var nnImageUpload;
  beforeEach(inject(function (_nnImageUpload_) {
    nnImageUpload = _nnImageUpload_;
  }));

  it('should do something', function () {
    expect(!!nnImageUpload).toBe(true);
  });

});
