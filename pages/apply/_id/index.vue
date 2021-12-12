<template>
  <div>
    <ApplyApplicationForm :appId="$route.params.id" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  middleware: "authenticated",
  data() {
    return {};
  },
  methods: {
    onSubmitted(postData) {
      axios
        .post(
          "https://yellowdot-b462e-default-rtdb.firebaseio.com/applications.json",
          postData
        )
        .then(result => console.log(result))
        .catch(e => console.log(e));
    }
  }
};
</script>

<style></style>
