
const MaterialsService = require('../../services/materials');

const MaterialsBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { key } = req.params;
    response = await MaterialsService.handle(key);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get material',
        error: response.message,
      };
      return {
        httpCode,
        response,
      };
    }

    return {
      httpCode,
      response,
    };
  },
};

module.exports = MaterialsBusinesses;
