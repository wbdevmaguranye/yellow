import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
// import MyFormulateAutocomplete from "@/components/MyFormulateAutocomplete";
// import MyRating from "@/components/MyRating";
// import MySwitch from "@/components/MySwitch";

// Vue.component("MyFormulateAutocomplete", MyFormulateAutocomplete);
// Vue.component("MyRating", MyRating);
// Vue.component("MySwitch", MySwitch);

Vue.use(VueFormulate, {
  // library: {
  //   atocomplete: {
  //     classification: "text",
  //     component: "MyFormulateAutocomplete"
  //   },
  //   atorating: {
  //     classification: "text",
  //     component: "MyRating"
  //   },
  //   atoswitch: {
  //     classification: "text",
  //     component: "MySwitch"
  //   }
  // },
  classes: {
    outer: ({ isGrouped }) => {
      return isGrouped ? "mb-1" : "mb-2";
    },
    wrapper: ({ classification }) => {
      switch (classification) {
        case "box":
          return "flex";
        default:
          return "";
      }
    },
    element: ({ classification, hasValue }) => {
      switch (classification) {
        case "group":
          return "mt-2";
        case "select":
          return !hasValue ? "text-gray-500 font-light" : "";
        default:
          return "";
      }
    },
    input: ({ classification }) => {
      switch (classification) {
        case "button":
          return "px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-700";

        case "group":
          return "";
        case "box":
          return "sr-only";
        default:
          return "inputfields";
      }
    },
    decorator: ({ hasValue }) => {
      let base = "border rounded inline-block w-4 h-4 mr-2";
      if (hasValue) {
        base += " bg-green-700";
      }
      return base;
    },
    label: "font-medium text-sm",
    help: "text-xs mb-1 text-gray-600",
    error: "text-red-700 text-xs mb-1"
  }
});
