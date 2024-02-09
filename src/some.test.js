function getUser(id) {
  return {
    id,
    email: `user${id}@example.com`,
  };
}

test('return a user object', () => {
  expect(getUser(1)).toEqual({
    id: 1,
    email: 'user1@example.com',
  });
});

test('array', () => {
  const colors = ['red', 'green', 'blue'];
  expect(colors).toHaveLength(3);
  expect(colors).toContain('red');
  expect(colors).not.toContain('yellow');
});
