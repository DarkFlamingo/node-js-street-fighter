const UserService = require('./userService');

class AuthService {
  login(userData) {
    if (Object.keys(userData).length) {
      const user = UserService.search(userData);
      if (!user) {
        throw Error('User not found');
      }
      return user;
    } else {
      throw Error('User not found');
    }
  }
}

module.exports = new AuthService();
