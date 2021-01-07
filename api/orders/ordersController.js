const service = require("../../service/ordersServices");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllOrders();
    res.json({
      status: "success",
      code: 200,
      orders: results,
    });

    console.log(`GET /orders/ ->`, 200);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  try {
    const result = await service.getOrderById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        order: result,
      });

      console.log(`GET /orders/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found order id: ${id}`,
        order: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await service.createOrder(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      order: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }

  console.log(`POST /orders ->`, 201);
};

const update = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.updateOrder(id, req.body);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        order: result,
      });

      console.log(`PATCH /orders/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found order id: ${id}`,
        order: "Not Found",
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
    const result = await service.removeOrder(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        order: result,
      });

      console.log(`DELETE /orders/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found order id: ${id}`,
        order: "Not Found",
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
