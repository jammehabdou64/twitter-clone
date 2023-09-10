import utils from "./utils";
import validator from "./validators";

const runValidation = async (
  requestBody: {},
  formData: {}
): Promise<{} | any> => {
  const req = requestBody;
  const errors = {};
  const validatedData = {};

  for (let data in formData) {
    for (let item of formData[data]) {
      if (item.includes("same:")) {
        const result = await validator(
          utils.splitValues(item, 0),
          [`${data}`, `${utils.splitValues(item, 1)}`],
          [`${utils.request(req, data)}`, `${req[utils.splitValues(item, 1)]}`]
        );

        if (result) {
          errors[data] = result;
        }
        validatedData[data] = req[data];
        break;
      }

      if (utils.checkIfcontainSecondValue(item)) {
        let result = await validator(
          utils.splitValues(item, 0),
          data,
          utils.request(req, data),
          utils.splitValues(item, 1)
        );
        if (result) {
          errors[data] = result;
          break;
        }

        validatedData[data] = req[data];
      }

      if (!utils.checkIfcontainSecondValue(item)) {
        let result = await validator(item, data, utils.request(req, data));
        if (result) {
          errors[data] = result;
          break;
        }
        validatedData[data] = req[data];
      }
    }
  }

  return { errors, validatedData };
};

export default runValidation;
