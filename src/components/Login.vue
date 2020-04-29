<template>
  <div id="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title" id="textPlacementTitle">
            Login to use UBEAT
          </p>
          <p class="subtitle" id="textPlacementTitle">
            don't have an account?
          </p>
          <p class="subtitle" id="textPlacementTitle">
            <b-button type="is-info" tag="router-link" to="/SignUp"
              >Sign up today !</b-button
            >
          </p>
        </div>
      </div>
    </div>

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
      @click="login"
      :disabled="!this.email.includes('@') || this.password === ''"
      >Login</b-button
    >
  </div>
</template>

<script>
import * as apiUser from "../api/apiUser";
import Cookies from "js-cookie";

export default {
  data: () => ({
    email: "",
    password: "",
    success: false,
    error: false
  }),
  methods: {
    login() {
      apiUser
        .login(this.email, this.password)
        .then(res => {
          apiUser.storeInCookie(res.token);
          this.email = "";
          this.password = "";
        })
        .then(() => {
          this.success = true;
          this.$buefy.toast.open({
            duration: 2000,
            message: `You are connected to your account`,
            position: "is-top",
            type: "is-success",
            queue: true
          });
        })
        .then(() => {
          apiUser.getTokenInfos(Cookies.get("token")).then(res => {
            this.$router.push(`user/${res["id"]}`);
          });
        })
        .catch(() => {
          this.error = true;
          this.password = "";

          this.$buefy.toast.open({
            duration: 2000,
            message: `Password does not match email or this account does not exist.`,
            position: "is-top",
            type: "is-danger",
            queue: true
          });
        });
    }
  }
};
</script>
