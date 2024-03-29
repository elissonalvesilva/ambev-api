const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
const MaterialsController = require('../../controllers/materials');
// const { authMiddleware } = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

// const joiOptions = {
// allowUnknown: true,
// };
//
// const validateMiddleware = (req, res, next) => {
// const schema = joiSchema;
//
// celebrate(schema, joiOptions)(req, res, next);
// };

router.get(
  '/',
  // authMiddleware,
  // validateMiddleware,
  MaterialsController.handle,
);

router.post(
  '/',
  // authMiddleware,
  // validateMiddleware,
  MaterialsController.create,
);

module.exports = router;
