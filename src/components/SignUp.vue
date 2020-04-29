<template>
  <div id="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title" id="textPlacementTitle">
            Join the generation of online music
          </p>
          <p class="subtitle is-3" id="textPlacementTitle">Sign up now !</p>
          <hr />
          <p class="subtitle is-6" id="textPlacementTitle">
            Already have an account?
          </p>
          <p class="subtitle is-6" id="textPlacementTitle">
            <b-button
              size="is-small"
              tag="router-link"
              to="/login"
              type="is-info"
              >Login</b-button
            >
          </p>
        </div>
      </div>
    </div>
    <b-field label="Name">
      <b-input v-model="nameUser"></b-input>
    </b-field>

    <b-field label="Email">
      <b-input type="email" v-model="email"> </b-input>
    </b-field>

    <b-field label="Password">
      <b-input
        v-model="password"
        type="password"
        maxlength="30"
        password-reveal
      ></b-input>
    </b-field>
    <b-button
      type="is-primary"
      @click="signUp"
      :disabled="
        !this.email.includes('@') ||
          this.nameUser === '' ||
          this.password === ''
      "
      >Sign up</b-button
    >
  </div>
</template>
<script>
import * as apiUser from "../api/apiUser";

export default {
  data: () => ({
    nameUser: "",
    email: "",
    password: ""
  }),
  methods: {
    signUp() {
      apiUser
        .signUp(this.nameUser, this.email, this.password)
        .then(() => {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Account has been created, you can now login",
            position: "is-top",
            type: "is-success"
          });

          this.$router.push("/login");
        })
        .catch(() => {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Account with this email already exists",
            position: "is-top",
            type: "is-danger"
          });
        });
    }
  }
};
</script>
