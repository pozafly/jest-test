/**
 * NOTE: 콜백 함수 테스트
 */

/**
 *
 * @param {string} id
 * @param {function} cb
 */
function fetchUser(id, cb) {
  setTimeout(() => {
    console.log('wait 0.1 sec.');
    const user = {
      id,
      name: `User${id}`,
      email: `${id}@test.com`,
    };
    cb(user);
  }, 100);
}

/**
 * wait 0.1 sec. 라는 콘솔이 찍히고,
 * Test는 통과하지만,
 * Cannot log after tests are done. Did you forget to wait for something async in your test?
 * 위와 같은 문구로 비동기 처리하는 것에 대한 이야기를 해준다.
 */
test('fetch a user', () => {
  fetchUser(1, (user) => {
    expect(user).toEqual({
      id: 1,
      name: 'User1',
      email: '1@test.com',
    });
  });
});

/**
 * Jest에게 명시적으로 이 테스트 함수는 비동기 코드 테스트 하니,
 * 콜백 함수가 호출되는지도 봐달라고 알려주면 된다.
 *
 * done을 인자에 넣고,
 * 마지막에 호출해주는 과정이 Jest에게 비동기 임을 알려주는 것.
 *
 * 만약 아래의 코드가 실패하는 코드라면, Test 시간이 대폭 늘어난다.
 * fetUser(2, (...)) 이렇게하면..
 */
test('fetch a user', (done) => {
  fetchUser(1, (user) => {
    expect(user).toEqual({
      id: 1,
      name: 'User1',
      email: '1@test.com',
    });
    done();
  });
});
