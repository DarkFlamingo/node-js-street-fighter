const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user
  getAll() {}

  create(data) {}

  update(id, data) {}

  delete(id) {}

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
