/**
 * jest.mock() 함수는 첫 번째 인자로 넘어온
 * 모듈 내의 모든 함수를 자동으로 목(mock) 함수로 바꿔줌.
 */
import { register, deregister } from './userService';
import { sendEmail, sendSMS } from './messageService';

jest.mock('./messageService');

beforeEach(() => {
  sendEmail.mockClear();
  sendSMS.mockClear();
});

const user = {
  email: 'test@email.com',
  phone: '012-345-6789',
};

test('register sends messeges', () => {
  register(user);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toBeCalledWith(user.email, '회원 가입을 환영합니다!');

  expect(sendSMS).toBeCalledTimes(1);
  expect(sendSMS).toBeCalledWith(user.phone, '회원 가입을 환영합니다!');
});

test('deregister sends messaes', () => {
  deregister(user);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toBeCalledWith(user.email, '탈퇴 처리 되었습니다.');

  expect(sendSMS).toBeCalledTimes(1);
  expect(sendSMS).toBeCalledWith(user.phone, '탈퇴 처리 되었습니다.');
});

/**
 * 즉,
 * messageService.sendEmail = jest.fn();
 * messageService.sendSMS = jest.fn();
 *
 * const { sendEmail, sendSMS } = messageService;
 *
 * 이 과정이,
 * jest.mock('./messageService');
 *
 * 이 한줄로 끝난 거임.
 */
