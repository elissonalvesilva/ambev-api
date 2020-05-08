
const logger = require('../../utils/logger');

const feedstockService = require('../../services/feedstock');

const FeedstockProcessedBusinessess = {
  async handle(req) {
    let response = '';
    let httpCode = 200;


    response = await feedstockService.processed();
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to process file',
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

module.exports = FeedstockProcessedBusinessess;
