const { user } = require('../models/user');
const { UserRepository } = require('../repositories/userRepository');

class UserService {
  // TODO: Implement methods to work with user
  getAll() {
    const users = UserRepository.getAll();
    return !users.length ? users : null;
  }

  create(data) {
    if (this.search({ email: data.email })) return null;
    if (this.search({ phoneNumber: data.phoneNumber })) return null;
    return UserRepository.create(data);
  }

  update(id, data) {
    if (!this.search({ id: id })) return null;
    return UserRepository.update(id, data);
  }

  delete(id) {
    if (!this.search({ id: id })) return null;
    return UserRepository.delete(id);
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
