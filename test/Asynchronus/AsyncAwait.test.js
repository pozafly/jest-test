// NOTE: Async Await 테스트

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
 * async, await는 문법 그대로 사용해주면 된다.
 */
test('fetch a user', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({
    id: 1,
    name: 'User1',
    email: '1@test.com',
  });
});
