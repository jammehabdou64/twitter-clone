import runValidation from "./runValidation";
import utils from "./utils";

const validate = async (request: {}, formData: {}) => {
  const { errors, validatedData } = await runValidation(request, formData);

  // const errors = validation?.errors;
  if (errors && Object.keys(errors).length > 0) {
    return utils.throwException(errors);
  }
  return validatedData;
};

export default validate;
