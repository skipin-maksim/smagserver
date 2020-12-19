const service = require("../../service/clientsServices");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllClients();
    res.json({
      status: "success",
      code: 200,
      clients: results,
    });

    console.log(`GET /clients/ ->`, 200);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.getTClientById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        client: result,
      });

      console.log(`GET /clients/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found client id: ${id}`,
        client: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const {
    id,
    firstName,
    secondName,
    thirdName,
    tel,
    email,
    city,
    post,
    debt,
  } = req.body;

  const clients = await service.getAllClients();

  try {
    const result = await service.createClient({
      id,
      firstName,
      secondName,
      thirdName,
      tel,
      email,
      city,
      post,
      debt,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      client: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }

  console.log(`POST /clients ->`, 201);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    secondName,
    thirdName,
    tel,
    email,
    city,
    post,
    debt,
  } = req.body;

  try {
    const result = await service.updateClient(id, {
      firstName,
      secondName,
      thirdName,
      tel,
      email,
      city,
      post,
      debt,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        client: req.body,
      });

      console.log(`PATCH /clients/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found client id: ${id}`,
        client: "Not Found",
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
    const result = await service.removeClient(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        client: result,
      });

      console.log(`DELETE /clients/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found client id: ${id}`,
        client: "Not Found",
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
