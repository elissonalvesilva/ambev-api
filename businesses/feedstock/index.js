const { v4: uuidv4 } = require('uuid');

const ResponseError = require('../../utils/error/response-error');
const FeedstockService = require('../../services/feedstock');
const { parserFile } = require('../../utils/file');
const conf = require('../../utils/config');

const acceptedFiles = conf.get('upload:file:allowedExtensions');

const FeedstockBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    if (!req.files || Object.keys(req.files).length === 0) {
      httpCode = 500;
      throw new ResponseError({
        code: 0,
        message: 'Unknown file upload',
      });
    }

    const file = req.files.mip;
    if (!acceptedFiles.includes(file.mimetype)) {
      httpCode = 500;
      throw new ResponseError({
        code: 0,
        message: 'Not accepted file',
      });
    }

    let fileName = file.name;
    // eslint-disable-next-line max-len
    const ext = fileName.substr((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
    fileName = `${uuidv4()}.${ext.toLowerCase()}`;

    const uploadPath = `${process.cwd()}/uploads/mip/${fileName}`;

    try {
      await file.mv(uploadPath);
    } catch (error) {
      throw new ResponseError({
        code: 0,
        message: `Error to upload file: error ${error}`,
      });
    }

    const parsedFile = parserFile(uploadPath);
    if (parsedFile.error) {
      httpCode = 500;
      response = {
        message: 'Error to process file',
        error: parsedFile.message,
      };
      return {
        httpCode,
        response,
      };
    }

    const { reprocess, dates } = req.query;
    let data = '';
    if (reprocess) {
      const listDates = dates.split(',');
      // eslint-disable-next-line max-len
      data = await FeedstockService.reProcess(parsedFile, uploadPath, listDates);
      if (data.error) {
        httpCode = 500;
        response = {
          message: 'Error to process file',
          error: data.message,
        };
        return {
          httpCode,
          response,
        };
      }
    }

    if (!reprocess) {
      data = await FeedstockService.process(parsedFile, uploadPath);
      if (data.error) {
        httpCode = 500;
        response = {
          message: 'Error to process file',
          error: data.message,
        };
        return {
          httpCode,
          response,
        };
      }
    }

    response = {
      message: 'sucess to process file',
      data,
    };

    return {
      httpCode,
      response,
    };
  },
};

module.exports = FeedstockBusinesses;
