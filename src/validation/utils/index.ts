import validator from "validator";
import { FormInterface } from "./FieldsInterFace";

class Util implements FormInterface {
  //

  capitalize(str: string): string {
    return `${str[0].toUpperCase() + str.slice(1)}`;
  }

  getModel(modelName: string): any {
    return "";
  }

  required(name: string, value: string): string | boolean {
    return validator.default.isEmpty(value)
      ? `${this.capitalize(name)} is required`
      : false;
  }

  min(name: string, firstValue: string, secondValue: string): string | boolean {
    return !validator.default.isLength(firstValue, { min: secondValue })
      ? `${this.capitalize(name)} should be minimum of ${secondValue} ${
          Number(secondValue) <= 1 ? "character" : "characters"
        }`
      : false;
  }

  max(name: string, firstValue: string, secondValue: string): string | boolean {
    return !validator.default.isLength(firstValue, { max: secondValue })
      ? `${this.capitalize(name)} should be miximum of ${secondValue} ${
          Number(secondValue) <= 1 ? "character" : "characters"
        }`
      : false;
  }

  email(value: string): string | boolean {
    return !validator.default.isEmail(value) ? `Email is invalid` : false;
  }

  bool(name: string, value: string): string | boolean {
    return !validator.default.isBoolean(value)
      ? `${this.capitalize(name)} should be a boolean`
      : false;
  }

  float(name: string, value: string): string | boolean {
    return !validator.default.default.isFloat(value)
      ? `${this.capitalize(name)} should be a float`
      : false;
  }

  number(name: string, value: string): string | boolean {
    return !validator.default.isNumeric(value)
      ? `${this.capitalize(name)} should only be a number`
      : false;
  }

  alpha(name: string, value: string): string | boolean {
    return !validator.default.isAlpha(value)
      ? `${this.capitalize(name)} should only contain letters`
      : false;
  }

  alphaNum(name: string, value: string): string | boolean {
    return !validator.default.isAlphanumeric(value)
      ? `${this.capitalize(name)} should only contain letters and numbers`
      : false;
  }

  same(names: Array<string>, values: Array<string>): string | boolean {
    let [firstName, SecondName] = names;
    let [firstValue, secondValue] = values;
    return validator.default.equals(firstValue, secondValue)
      ? false
      : `${this.capitalize(firstName)} did not match with ${this.capitalize(
          SecondName
        )}`;
  }

  creditCard(name: string, value: string): string | boolean {
    return !validator.default.isCreditCard(validator)
      ? `${this.capitalize(name)} invalid credit card`
      : false;
  }

  url(name: string, value: string): string | boolean {
    return !validator.default.isURL(value)
      ? `${this.capitalize(name)} invalid url`
      : false;
  }

  decimal(name: string, value: string): string | boolean {
    return !validator.default.isDecimal(value)
      ? `${this.capitalize(name)} should be a decimal number`
      : false;
  }

  int(name: string, value: string): string | boolean {
    return !validator.default.isInt(value)
      ? `${this.capitalize(name)} should be an integer`
      : false;
  }

  json(name: string, value: string): string | boolean {
    return !validator.default.isJSON(validator)
      ? `${this.capitalize(name)} invalid json data`
      : false;
  }

  async unique(
    name: string,
    value: string,
    modelName: string
  ): Promise<string | boolean> {
    try {
      let model = this.getModel(`${this.capitalize(modelName)}`);
      return (await model?.findOne({ [name]: value }))
        ? `${this.capitalize(name)} already exist`
        : false;
    } catch (e) {
      console.log("db error", e.message);
    }
    return false;
  }

  jwt(name: string, value: string): string | boolean {
    return validator.default.isJWT(value)
      ? `${this.capitalize(name)} invalid jwt`
      : false;
  }

  postal(name: string, value: string): string | boolean {
    return !validator.default.isPostalCode(value)
      ? `${this.capitalize(name)} invalid postal code`
      : false;
  }

  nullable(): boolean {
    return false;
  }

  phone(name: string, value: string): string | boolean {
    return !validator.default.isMobilePhone(value)
      ? `${this.capitalize(name)} invalid phone number`
      : false;
  }

  slug(name: string, value: string): string | boolean {
    return !validator.default.isSlug(value)
      ? `${this.capitalize(name)} invalid slug`
      : false;
  }

  next(): boolean {
    return false;
  }

  mongoDbId(name: string, value: string): string | boolean {
    return !validator.default.isSlug(value)
      ? `${this.capitalize(name)} invalid mongodb id`
      : false;
  }

  splitValues(data: string, index: number): string {
    return data.split(":")[index].replace(/\s/g, "");
  }

  checkIfcontainSecondValue(data: string): boolean {
    return (
      data.includes("min:") || data.includes("max:") || data.includes("unique:")
    );
  }

  request(request: any, data: string): string | {} {
    return request?.body[data] ? request?.body[data] : "";
  }

  throwException = (errors: {}): never => {
    throw errors;
  };
}

export default new Util();
