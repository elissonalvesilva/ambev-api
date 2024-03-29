/* eslint-disable no-return-await */
/* eslint-disable camelcase */

const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

// eslint-disable-next-line camelcase
const { materials } = require('../../models');

const upsert = (values, where) => materials
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return materials.create(values);
  });

const findOne = async (key) => await materials.findOne({ where: { key } });

const findAll = async () => await materials.findAll();

const material = async (params) => {
  const {
    key,
  } = params;

  const where = {
    key,
  };

  try {
    const response = await upsert(params, where);
    return response;
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a cbz plan register',
    });
  }
};

const MaterialsService = {
  async handle(key) {
    let materialResponse = '';

    try {
      if (key) {
        materialResponse = await findOne(key);
      } else {
        materialResponse = await findAll(key);
      }
    } catch (error) {
      logger.info(error);
      materialResponse = {
        error: true,
        message: error.message,
      };
    }

    return materialResponse;
  },
  async create(params) {
    let materialResponse = '';

    try {
      materialResponse = await material(params);
    } catch (error) {
      logger.info(error);
      materialResponse = {
        error: true,
        message: error.message,
      };
    }

    return materialResponse;
  },
};

module.exports = MaterialsService;
