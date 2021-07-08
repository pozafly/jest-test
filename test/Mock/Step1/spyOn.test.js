it('exam', () => {
  expect(1).toBe(1);
});

/**
 * NOTE: mocking에는 스파이라는 개념이 있음.
 * 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고,
 * 해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아내줌.
 *
 * jest.spyOn(object, methodName)
 *
 * 아래는 add 메서드에 스파이를 붙임.
 * 따라서, add 메서드 호출 횟수와 어떤 인자가 넘어갔는지 검증 가능.
 */
const calculator = {
  add: (a, b) => a + b,
};

const spyFn = jest.spyOn(calculator, 'add');

const result = calculator.add(2, 3);

expect(spyFn).toBeCalledTimes(1);
expect(spyFn).toBeCalledWith(2, 3);
expect(result).toBe(5);
