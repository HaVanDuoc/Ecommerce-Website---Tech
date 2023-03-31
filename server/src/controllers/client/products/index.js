const { intervalServerError } = require("../../../middleware/handleError");
const { productsService } = require("../../../services/client/products");

exports.productsController = async (req, res) => {
  try {
    const response = await productsService(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
