const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  // TODO: Implement methods to work with fighters
  getAll() {
    const fighters = FighterRepository.getAll();
    return fighters.length ? fighters : null;
  }

  create(data) {
    if (this.search({ name: data.name })) return null;
    return FighterRepository.create(data);
  }

  update(id, data) {
    if (!this.search({ id: id })) return null;
    if (this.search({ name: data.name })) return null;
    return FighterRepository.update(id, data);
  }

  delete(id) {
    if (!this.search({ id: id })) return null;
    return FighterRepository.delete(id);
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new FighterService();
