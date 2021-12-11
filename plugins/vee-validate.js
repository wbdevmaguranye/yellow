import Vue from "vue";
import { extend } from "vee-validate";
import {
  required,
  email,
  min,
  integer,
  max,
  between,
  min_value,
  alpha_num,
  phone,
  regex,
  excluded,
  ext
} from "vee-validate/dist/rules";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("regex", regex);
extend("ext", ext);

extend("required", {
  ...required,
  message: "This field is required"
});

extend("excluded", {
  ...excluded,
  message: "Invalid Selection"
});
extend("min_value", {
  ...min_value,
  message: "Your {_field_} must be more than {min}"
});
extend("alpha_num", {
  ...alpha_num,
  message: "Enter Valid characters"
});

extend("email", {
  ...email,
  message: "Enter Valid Email Address"
});

extend("between", {
  ...between,
  validate(value, { min, max }) {
    return value >= min && value <= max;
  },
  params: ["min", "max"],
  message: "The {_field_} it must be between {min} and {max}"
});

extend("integer", {
  ...integer,
  message: "Only Whole numbers are allowed"
});

extend("max", {
  ...max,
  message: "Your value exceeded"
});

extend("min", {
  ...min,
  message: "Must not be less than "
});
// extend("min", min);
// extend('digits_between', {
//   async validate(value, { min, max }) {
//         const res = await validate(value, `numeric|min:${min}|max:${max}`,)
//             return res.valid;
//   },
//   params: ['min', 'max'],
//   message: 'The {_field_} must be between {min} and {max} digits'
// });

// extend("min", {
//   ...min,
//   validate(value, { length }) {
//     return value.length >= length;
//   },
//   params: ["length"],
//   message: "The {field} field must have at least {length} characters"
// });

extend("strong_password", {
  message:
    "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc) and at least 8 chars",
  validate: value => {
    var strongRegex = new RegExp(
      "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(value);
  }
});

// extend("phone", {
//   ...phone,
//   message:
//     "put valid phone number",
//   validate: value => {
//     var strongRegex = new RegExp(
//       "^(\+27|0)[6-8][0-9]{8}$"
//     );
//     return strongRegex.test(value);
//   }
// });

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match"
});
