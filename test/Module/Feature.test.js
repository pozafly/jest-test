import userService from './service/userService';
import data from './service/data';

/**
 * findAll 테스트
 * toContain()은 배열 안, Primitive 값을 검사하지만,
 * toContainEqual()은 배열 안, 객체를 검사한다.
 */
test('find all users', () => {
  // data.users.push(
  //   { id: 1, email: 'user1@test.com' },
  //   { id: 2, email: 'user2@test.com' },
  //   { id: 3, email: 'user3@test.com' }
  // );

  const users = userService.findAll();

  expect(users).toHaveLength(3);
  expect(users).toContainEqual({ id: 1, email: 'user1@test.com' });
  expect(users).toContainEqual({ id: 2, email: 'user2@test.com' });
  expect(users).toContainEqual({ id: 3, email: 'user3@test.com' });
});

/**
 * create 테스트
 * 아래와 같이 작성하게 되면 Fail이 뜬다.
 * 이유는, 벌써 위에서 findAll() 검사를 할 때, 객체가 3개 더 추가되었기 때문.
 * 따라서 toHaveLength는 4가 맞다.
 */
test('create a user', () => {
  const user = { id: '4', email: 'user4@test.com' };

  userService.create(user);

  // expect(data.users).toHaveLength(1);
  expect(data.users).toContainEqual(user);
});

/**
 * NOTE: afterEach() 로 데이터 정리하기
 * 위와 같은 상황일 경우, data 모듈에 저장되어 있는 데이터를 정리해주는 작업이 필요.
 * 📌 afterEach()는 테스트가 실행된 후(test())마다 호출된다.
 * 즉, 각각의 테스트 환경에서 초기화 된다. afterEach가 선언된 위치와 '상관없음'.
 *
 * 📌 궁금한 점은, afterEach, beforeEach는 test 전체에 영향을 주는지?
 * 아니면 이 파일 scope 안에서만 주는지?
 * 👉 https://velog.io/@modolee/jest-user-guide-06
 * 이곳에 따르면, block 단위로 사용된다. 즉, 여러번 쓸 수 있음. 또한 범위 내부의 녀석들은 외부의 afterEach에 영향을 받는다.
 */
afterEach(() => {
  data.users.splice(0);
});

test('create a user2', () => {
  const user = { id: '4', email: 'user4@test.com' };

  userService.create(user);

  // expect(data.users).toHaveLength(1);
  expect(data.users).toContainEqual(user);
});

/**
 * destroy 테스트
 */
test('destroy a user', () => {
  // data.users.push(
  //   { id: 1, email: 'user1@test.com' },
  //   { id: 2, email: 'user2@test.com' },
  //   { id: 3, email: 'user3@test.com' }
  // );

  const id = 3;
  const user = data.users.find((someUser) => someUser.id === id);

  userService.destroy(id);

  expect(data.users).toHaveLength(2);
  expect(data.users).not.toContainEqual(user);
});

/**
 * NOTE: beforeEach() 로 중복 코드 제거하기.
 * beforeEach()는 테스트 실행 전 항상 실행된다.
 * create, destory 코드를 보면, data 모듈에 초기 데이터를 적재하는 코드가 중복된다.
 * 따라서 test 전에 미리 생성 코드를 작성해 중복 제거 가능.
 */
beforeEach(() => {
  data.users.push(
    { id: 1, email: 'user1@test.com' },
    { id: 2, email: 'user2@test.com' },
    { id: 3, email: 'user3@test.com' }
  );
});

/**
 * NOTE: beforeAll(), afterAll()
 * 각각 함수의 전후에 매번 호출되는 것이 아니라, 맨 처음과 맨 끝에 딱 한 번씩만 호출된다.
 *
 * 예로, DB Connection 객체
 */
// let connection;
// beforeAll(() => {
//   connection = openConnection({ host: '...', post: '...' });
// });
// afterAll(() => {
//   connection.close();
// });

/**
 * NOTE: only(), skip() : 디버깅 함수.
 * 테스트 파일 안에, 테스트 함수가 많은데, 그 중 하나만 실패했을 경우,
 * 그 함수만 단독으로 실행해보고 싶을 때가 있음. 해당 함수 뒤 .only() 라고 붙여주면
 * Jest가 테스트 파일을 실행할 때, 이녀석만 실행해줌.
 * .skip()은 반대로 이녀석만 제외.
 */
// test.only('run only', () =>{
//   (...)
// });
// test.('not run', () =>{
//   (...)
// });

/**
 * NOTE: describe(), it()
 * 연관된 테스트 함수끼리 그룹화 해놓으면 코드를 읽기가 좋다.
 * describe()는 그룹화 해주고, it()은 test()의 별칭이다.
 */
describe('group 1', () => {
  test('test 1-1', () => {
    expect(1).toBe(1);
  });

  test('test 1-2', () => {
    expect(1).toBe(1);
  });
});

describe('group 2', () => {
  it('test 2-1', () => {
    expect(1).toBe(1);
  });

  it('test 2-2', () => {
    expect(1).toBe(1);
  });
});
