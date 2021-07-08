// NOTE: Matcher에 대한 설명

/**
 * toBe()는 객체를 제외한
 * Javascript의 primitive 값을 비교할 때 사용됨.
 */
test('1 is 1', () => {
  expect(1).toBe(1);
});

/**
 * 마찬가지로 primitive 값.
 */
test('테스트 설명', () => {
  expect('검증 대상').toBe('검증 대상');
});

function getUser(id) {
  return {
    id,
    email: `user${id}@test.com`,
  };
}

/**
 * toEqual()
 * Object일 때는 toBe가 먹히지 않음.
 * toEqual()를 사용해서 비교해주어야 한다.
 */
test('return a user object', () => {
  // expect(getUser(1)).toBe({
  expect(getUser(1)).toEqual({
    id: 1,
    email: 'user1@test.com',
  });
});

/**
 * toBeFalsy() : false값 리턴인지?
 * toBeTruthy() : true값 리턴인지?
 */
test('number 0 is falsy but string 0 is truthy', () => {
  expect(0).toBeFalsy();
  expect('0').toBeTruthy();
});

/**
 * array 검사
 * toHaveLength() : 길이 검사
 * toContain() : 포함 여부 검사
 * .not을 붙여주면 불만족를 return 함.
 * 📌 toContainEqual() : 배열 안의 객체가 동일한지 검사.
 */
test('array', () => {
  const colors = ['Red', 'Yellow', 'Blue'];
  expect(colors).toHaveLength(3);
  expect(colors).toContain('Yellow');
  expect(colors).not.toContain('Green');
});

/**
 * string 검사
 * toMatch() : 정규식 검사
 */
test('string', () => {
  expect(getUser(1).email).toBe('user1@test.com');
  expect(getUser(2).email).toMatch(/.*.test.com$/);
});

/**
 * 예외 발생 여부
 * toThrow() : 예외 발생 여부 테스트
 */
function getUser2(id) {
  if (id <= 0) throw new Error('Invalid ID');
  return {
    id,
    email: `user${id}@test.com`,
  };
}

// test('throw when id is non negative', () => {
//   expect(getUser2(-1)).toThrow();
//   expect(getUser2(-1)).toThrow('Invalid ID');
// });

/**
 * NOTE: 위 코드는 실행하면서 반드시 에러가 발생하기 때문에
 * 함수에 넘기는 검증 대상을 함수로 한번 감싸줘야 함.
 */
test('throw when id is non negative', () => {
  expect(() => getUser2(-1)).toThrow();
  expect(() => getUser2(-1)).toThrow('Invalid ID');
});
