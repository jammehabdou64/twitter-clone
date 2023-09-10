export interface FormInterface {
  required(name: string, value: string): string | boolean;
  min(name: string, firstValue: string, secondValue: string): string | boolean;
  max(name: string, firstValue: string, secondValue: string): string | boolean;
  email(value: string): string | boolean;
  bool(name: string, value: string): string | boolean;
  float(name: string, value: string): string | boolean;
  number(name: string, value: string): string | boolean;
  alpha(name: string, value: string): string | boolean;
  alphaNum(name: string, value: string): string | boolean;
  same(names: Array<string>, values: Array<string>): string | boolean;
  creditCard(name: string, value: string): string | boolean;
  url(name: string, value: string): string | boolean;
  decimal(name: string, value: string): string | boolean;
  int(name: string, value: string): string | boolean;
  json(name: string, value: string): string | boolean;
  unique(
    name: string,
    value: string,
    modelName: string
  ): Promise<string | boolean>;
  jwt(name: string, value: string): string | boolean;
  postal(name: string, value: string): string | boolean;
  nullable(): boolean;
  phone(name: string, value: string): string | boolean;
  slug(name: string, value: string): string | boolean;
  next(): boolean;
  mongoDbId(name: string, value: string): string | boolean;
  splitValues(data: string, index: number): string;
  checkIfcontainSecondValue(data: string): boolean;
  request(request: any, data: string): {} | string;
}
