import axios from 'axios';
import userService from '../Step1/Integration/userService';

// test('findOne fetches data from the API endpoint', async () => {
//   const spyGet = jest.spyOn(axios, 'get');
//   await userService.findOne(1);
//   expect(spyGet).toBeCalledTimes(1);
//   expect(spyGet).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`);
// });

// test('findOne returns what axios get returns', async () => {
//   axios.get = jest.fn().mockResolvedValue({
//     data: {
//       id: 1,
//       name: 'HST',
//     },
//   });

//   const user = await userService.findOne(1);
//   expect(user).toHaveProperty('id', 1);
//   expect(user).toHaveProperty('name', 'HST');
// });

/**
 * NOTE: 위의 fn(), spyOn()를 사용한 두 개의 test 케이스를, mock()으로 통합해 하나의 케이스로 만들어보자.
 *
 * axios 모듈 전체를 모킹해버리면,
 * get을 포함한 axios 모든 메서드가 목 함수로 자동 대체되기 때문에,
 * 이미 목 함수가 되어버린 axios.get 함수가 임의의 데이터를 resolve 하도록 처리만 해주면,
 * 호출 이력까지 추가 설정 없이 기본적으로 제공 된다.
 */
jest.mock('axios');

test('findOne fetches data from the API endpoint and returns what axios get returns', async () => {
  axios.get.mockResolvedValue({
    data: {
      id: 1,
      name: 'Hst',
    },
  });

  const user = await userService.findOne(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'Hst');
  expect(axios.get).toBeCalledTimes(1);
  expect(axios.get).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`);
});
