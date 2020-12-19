const service = require("../../service/numOrderServices");

const get = async (req, res, next) => {
  try {
    const results = await service.getNumOrder();

    res.json({
      status: "success",
      code: 200,
      numOrder: results,
    });

    console.log(`GET /numOrder/ ->`, 200);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { valueNum, valueStr } = req.body;
  try {
    const result = await service.updateNumOrder(id, {
      valueNum,
      valueStr,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        numOrder: result,
      });

      console.log(`PATCH /numOrder/${id} ->`, 200);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found numOrder: ${id}`,
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
  update,
};
