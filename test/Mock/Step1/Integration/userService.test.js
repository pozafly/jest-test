import axios from 'axios';
import userService from './userService';

/**
 * 먼저 mocking 없이 axios api를 사용해 call
 * 📌 toHaveProperty() : 검사 객체가 해당 프로퍼티를 가지고 있는지 테스트
 */
test('findOne returns a user', async () => {
  const user = await userService.findOne(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'Leanne Graham');
});

/**
 * 만약, findOne() 함수가 외부 API 연동을 통해 사용자 정보를 조회해야하는지 테스트 하려면?
 * 이 함수는 내부적으로 axios 객체의 get 메서드를 사용하고 있기 때문에 스파이를 붙일 수 있음.
 */
test('findOne fetches data from the API endpoint', async () => {
  const spyGet = jest.spyOn(axios, 'get');
  await userService.findOne(1);
  expect(spyGet).toBeCalledTimes(1);
  expect(spyGet).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`);
});

/**
 * 하지만 이 테스트는 API 서버가 다운되거나 네트워크 오류라면 실패함.
 * 테스트는 deterministic 해야한다(언제 실행되든 항상 같은 결과를 내야한다)라는 원칙에 위배됨.
 * 외부 환경에 의존하기 때문.
 *
 * 이 문제를 해결하려면, axios의 get 메서드가 항상 안정적으로 결과를 반환하도록 mocking 해야 함.
 */
test('findOne returns what axios get returns', async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      id: 1,
      name: 'HST',
    },
  });

  const user = await userService.findOne(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'HST');
});
