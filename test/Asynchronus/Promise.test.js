// NOTE: 프로미스 테스트

/**
 *
 * @param {string} id
 * @returns {Promise}
 */
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('wait 0.1 sec.');
      const user = {
        id,
        name: `User${id}`,
        email: `${id}@test.com`,
      };
      resolve(user);
    }, 100);
  });
}

/**
 * then()을 사용해 Promise를 테스트 함.
 * 해결 방법은, return 문만 추가해주면 된다.
 * 테스트 함수가 Promise를 return 하면 Jest가 resolve될 때까지 기다려줌.
 */
// test('fetch a user', () => {
//   return fetchUser(1).then((user) => {
//     (...)
//   });
// });
test('fetch a user', () =>
  fetchUser(1).then((user) => {
    expect(user).toEqual({
      id: 1,
      name: 'User1',
      email: '1@test.com',
    });
  }));
