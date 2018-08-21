const R = require('../main');

test("callSync call R script to calculate '1 + 3'", () => {
  const result = R.callSync('src/__tests__/R/test.R', {
    a: 1,
    b: 3,
  });
  const expected = JSON.parse('[4]');
  expect(result).toEqual(expected);
});

test("call R script to calculate '1 + 3'", () => {
  const expected = JSON.parse('[4]');

  expect.assertions(1);

  return R.call('src/__tests__/R/test.R', {
    a: 1,
    b: 3,
  }).then((result) => {
    expect(result).toEqual(expected);
  });
});

test('callSync with non-existing file', () => {
  const result = R.callSync('../someRandomFile.R', {
    a: 1,
    b: 3,
  });

  expect(result).toContain('Exit code: 2');
});

test('callSync R script returns error', () => {
  const result = R.callSync('src/__tests__/R/test_error.R', {
    a: 1,
    b: 3,
  });

  expect(result).toContain('Error in fromJSON');
});

test('callSync R script returns no JSON result', () => {
  const result = R.callSync('src/__tests__/R/test_no_JSON_result.R', {
    a: 1,
    b: 3,
  });

  expect(result).toContain('in JSON at position');
});

test('callSync without args', () => {
  const result = R.callSync('src/__tests__/R/test_no_args.R');
  const expected = JSON.parse('[4]');

  expect(result).toEqual(expected);
});

test('call with non-existing file', () => {
  expect.assertions(1);

  return R.call('../someRandomFile.R', {
    a: 1,
    b: 3,
  }).catch((error) => {
    expect(error.message).toContain('Exit code: 2');
  });
});

test('call R script returns error', () => {
  expect.assertions(1);

  return R.call('src/__tests__/R/test_error.R', {
    a: 1,
    b: 3,
  }).catch((error) => {
    expect(error.message).toContain('Error in fromJSON');
  });
});

test('call R script returns no JSON result', () => {
  expect.assertions(1);

  return R.call('src/__tests__/R/test_no_JSON_result.R', {
    a: 1,
    b: 3,
  }).catch((error) => {
    expect(error.message).toContain('in JSON at position');
  });
});

test('call without args', () => {
  const expected = JSON.parse('[4]');

  expect.assertions(1);

  return R.call('src/__tests__/R/test_no_args.R')
    .then((result) => {
      expect(result).toEqual(expected);
    });
});
