const mockFn = jest.fn();

mockFn.mockImplementation((name) => `i am a ${name}`);

it('test', () => {
  mockFn('a');
  mockFn(['b', 'c']);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith('a');
  expect(mockFn).toHaveBeenCalledWith(['b', 'c']);
});
