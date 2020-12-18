const service = require("../../service/productsService");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllProducts();
    res.json({
      status: "success",
      code: 200,
      products: results,
    });

    console.log(`GET /products/ ->`, 200);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.getTProductById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        product: result,
      });

      console.log(`GET /products/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found product id: ${id}`,
        product: "Not Found",
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
  const isProduct = products.find((i) => i.vendorCode === vendorCode);

  if (!isProduct) {
    try {
      const result = await service.createProduct({
        provider,
        vendorCode,
        prices,
      });

      res.status(201).json({
        status: "success",
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
      status: "success",
      code: 409,
      product: "Product with such vendorCode exists",
    });
    console.log("Product with such vendorCode exists");
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
        status: "success",
        code: 200,
        product: result,
      });

      console.log(`PATCH /products/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found product id: ${id}`,
        product: "Not Found",
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
        status: "success",
        code: 200,
        product: result,
      });

      console.log(`DELETE /products/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found product id: ${id}`,
        product: "Not Found",
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
