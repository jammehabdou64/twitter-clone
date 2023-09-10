import validate from "./validate";
import { NextRequest } from "next/server";

class FormRequest {
  /**
   * 
   * Object.keys(this)
    .forEach(key => {
      console.log(this[key as keyof MyClass]);
    });


    export const X = {
  aa: {
    a: '1',
    b: '2',
  },
  bb: {
    a: '3',
    b: '4',
  },
} as const

export const f1 = () => {
  let k1: keyof typeof X
  for (k1 in X) {
    console.log(k1)

    let k2: keyof (typeof X)[keyof typeof X]
    for (k2 in X[k1]) {
      console.log(X[k1][k2])
    }
  }
}
   */

  async requestBody(request: NextRequest) {
    return await request.json();
  }

  async validate(formData: {}) {
    return validate(this.requestBody, formData);
  }
}

export default FormRequest;
