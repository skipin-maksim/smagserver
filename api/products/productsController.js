const service = require('../../service/productsService');

const get = async (req, res, next) => {
  const page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!req.query.limit) limit = 10;
  const skipIndex = (page - 1) * limit;

  try {
    const data = await service.Product.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    const total = await service.Product.countDocuments();
    const totalPages = Math.ceil(total / limit);
    res.status(200).json({
      data,
      total,
      totalPages,
    });
  } catch (e) {
    res.status(500).json({ message: 'Error Occured' });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.getTProductById(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        product: result,
      });

      console.log(`GET /products/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found product id: ${id}`,
        product: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { provider, vendorCode, prices } = req.body;

  const products = await service.getAllProducts();
  const isProduct = products.find(i => i.vendorCode === vendorCode);

  if (!isProduct) {
    try {
      const result = await service.createProduct({
        provider,
        vendorCode,
        prices,
      });

      res.status(201).json({
        status: 'success',
        code: 201,
        product: result,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }

    console.log(`POST /products ->`, 201);
  } else {
    res.status(409).json({
      status: 'success',
      code: 409,
      product: 'Product with such vendorCode exists',
    });
    console.log('Product with such vendorCode exists');
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { provider, vendorCode, prices } = req.body;
  try {
    const result = await service.updateProduct(id, {
      provider,
      vendorCode,
      prices,
    });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        product: result,
      });

      console.log(`PATCH /products/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found product id: ${id}`,
        product: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.removeProduct(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        product: result,
      });

      console.log(`DELETE /products/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found product id: ${id}`,
        product: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
