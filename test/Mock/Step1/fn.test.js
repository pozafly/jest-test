it('exam', () => {
  expect(1).toBe(1);
});

/**
 * jest.fn()
 */
const mockFn = jest.fn();

/**
 * mockFn()은 일반 JS 함수와 동일한 방식으로 인자를 넣음.
 * 아래 함수의 호출 결과는 모두 `undefined` 임.
 * 어떤 값을 return 해야할지 알려주지 않았기 때문.
 */
// mockFn();
// mockFn(1);
// mockFn('a');
// mockFn([1, 2], { a: 'b' });

/**
 * mockReturnValue(리턴 값) 함수를 이용해,
 * 가짜 함수가 어떤 `값`을 return 해야할지 설정해줄 수 있음.
 */
mockFn.mockReturnValue('I am a mock!');
console.log(mockFn());

/**
 * mockResolvedValue(Promise가 resolve 하는 값)
 * 함수를 사용하면 `가짜 비동기` 함수를 만들 수 있음.
 */
mockFn.mockResolvedValue('I will be a mock!');
mockFn().then((result) => {
  console.log(result);
});

/**
 * mockImplementation(구현 코드)
 * 함수를 사용하면 아예 해당 함수를 즉성해서 재구현 할 수 있음.
 */
mockFn.mockImplementation((name) => `I am ${name}`);
console.log(mockFn('HST'));

/**
 * 가짜 함수는 자신이 어떻게 호출되었는지를 모두 기억한다.
 */
mockFn('a');
mockFn(['b', 'c']);
expect(mockFn).toBeCalledTimes(5); // 이때까지 mockFn() 함수 호출 갯수
expect(mockFn).toBeCalledWith('a'); // a를 불렀는지 여부.
expect(mockFn).toBeCalledWith(['b', 'c']);
