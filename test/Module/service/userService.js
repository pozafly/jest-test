import data from './data';

const userService = {
  findAll() {
    return data.users;
  },

  create(user) {
    data.users.push(user);
  },

  destroy(id) {
    data.users.splice(
      data.users.findIndex((user) => user.id === id),
      1
    );
  },

  update(id, user) {
    data.users[data.users.findIndex((someUser) => someUser.id === id)] = user;
  },
};

export default userService;
