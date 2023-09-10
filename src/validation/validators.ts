import utils from "./utils";

const validators = async (
  validationMethod: string,
  name: any,
  value: any,
  secondValue: string = "0"
) => {
  try {
    switch (validationMethod) {
      case "required":
        return utils.required(name, value);

      case "min" || "min:":
        return utils.min(name, value, secondValue);

      case "max":
        return utils.max(name, value, secondValue);

      case "email":
        return utils.email(value);

      case "unique":
        return await utils.unique(name, value, secondValue);

      case "same":
        return utils.same(name, value);

      case "alpha":
        return utils.alpha(name, value);

      case "alphaNum":
        return utils.alphaNum(name, value);

      case "num":
        return utils.number(name, value);

      case "bool":
        return utils.bool(name, value);

      case "float":
        return utils.float(name, value);

      case "int":
        return utils.int(name, value);

      case "decimal":
        return utils.decimal(name, value);

      case "jwt":
        return utils.jwt(name, value);

      case "json":
        return utils.json(name, value);

      case "postal":
        return utils.postal(name, value);

      case "slug":
        return utils.slug(name, value);

      case "url":
        return utils.url(name, value);

      case "creditCard":
        return utils.creditCard(name, value);

      case "mongoId":
        return utils.mongoDbId(name, value);

      case "nullable":
        return utils.nullable();

      case "phone":
        return utils.phone(name, value);

      case "next":
        return utils.next();

      default:
        throw new Error(`${validationMethod}() invalid method`);
    }
  } catch (error) {
    console.log("An error occur in validation");
  }
};

export default validators;
