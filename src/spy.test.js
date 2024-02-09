const calculator = {
  add: (a, b) => a + b,
};

const spyFn = jest.spyOn(calculator, 'add');
const result = calculator.add(1, 2);

console.log(result);

it('', () => {
  expect(spyFn).toHaveBeenCalledTimes(1);
  expect(spyFn).toHaveBeenCalledWith(1, 2);
  expect(result).toBe(3);
});
