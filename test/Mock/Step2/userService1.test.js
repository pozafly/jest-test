/**
 * userService 모듈을 테스트하기 위해 messageService 모듈을 모킹해보자.
 * 여기서 sendEmail(), sendSMS() 함수를 목 함수로 대체.
 *
 * 왜냐하면, 실제 이메일이나 문자를 보낼 필요가 없고,
 * 단순히 userService가 제대로 호출되는지 여부만 알면 되기 때문.
 */

/**
 * 먼저 fn()을 이용한 mocking 이다.
 *
 * 아래와 같이 생각하기 쉽다
 * 하지만, import는 내부적으로 const로 할당하기 때문에 되지 않음.
 */
// import { sendEmail, sendSMS } from './messageService';
// sendEmail = jest.fn();
// sendSMS = jest.fn();

/**
 * 차선책으로 messageService 모듈의 모든 함수를 하나의 객체로 불러오면 된다.
 */
import { register, deregister } from './userService';
import * as messageService from './messageService';

messageService.sendEmail = jest.fn();
messageService.sendSMS = jest.fn();

const { sendEmail, sendSMS } = messageService;

beforeEach(() => {
  sendEmail.mockClear();
  sendSMS.mockClear();
});

const user = {
  email: 'test@email.com',
  phone: '012-345-6789',
};

test('register sends messages', () => {
  register(user);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toBeCalledWith(user.email, '회원 가입을 환영합니다!');

  expect(sendSMS).toBeCalledTimes(1);
  expect(sendSMS).toBeCalledWith(user.phone, '회원 가입을 환영합니다!');
});

test('deregister sends messages', () => {
  deregister(user);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toBeCalledWith(user.email, '탈퇴 처리 되었습니다.');

  expect(sendSMS).toBeCalledTimes(1);
  expect(sendSMS).toBeCalledWith(user.phone, '탈퇴 처리 되었습니다.');
});

/**
 * 위와 같이 jest.fn(), jest.spyOn() 을 통해 모듈을 모킹하려고 하면
 * 불필요하게 처리가 까다로워지는 경우가 많음.
 *
 * 예를 들어, messageService 모듈에서 제공하는 함수가 엄청 많다면?
 * userService2.test.js로 가보자.
 */
