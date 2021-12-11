<template>
  <div>
    <ApplyApplicationForm @submit="onSubmitted" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    onSubmitted(postData) {
      axios
        .post(
          "https://wozipo-b462e-default-rtdb.firebaseio.com/applications.json",
          postData
        )
        .then(result => console.log(result))
        .catch(e => console.log(e));
    }
  }
};
</script>

<style></style>
