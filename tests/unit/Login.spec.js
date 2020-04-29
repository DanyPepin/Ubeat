import { createLocalVue, shallowMount } from "@vue/test-utils";
import Buefy from "buefy";
import flushPromises from "flush-promises";
import Login from "@/components/Login.vue";
import router from "@/router";

describe("Login component unit test", () => {
  beforeEach(function() {
    global.fetch = jest.fn().mockImplementation((url, options) => {
      let isSuccess = false;
      if (options.method === "POST") {
        if (url === "http://ubeat.herokuapp.com/login") {
          const data = options.body;
          const items = data.split("&");
          const fields = items.map(x => {
            return x.split("=");
          });
          if (
            fields[0][0] === "email" &&
            fields[0][1] === "test111%40gmail.com"
          ) {
            if (fields[1][0] === "password" && fields[1][1] === "123") {
              isSuccess = true;
            }
          }
        }
        if (!isSuccess) {
          let p2 = new Promise((resolve, reject) => {
            reject({
              code: 401,
              message: "Invalid User and Password"
            });
          });
          return p2;
        }
      } else if (options.method === "GET") {
        if (url === "http://ubeat.herokuapp.com/tokenInfo") {
          return new Promise(resolve =>
            resolve({
              ok: true,
              Id: "456",
              json: function() {
                return {
                  following: [],
                  name: "test111",
                  email: "test111@gmail.com",
                  token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTk1ZjAwOGIwYjJmNTAwMDQ5YjQ4ZGEiLCJleHAiOjE1ODcyOTQ0NzE2Njd9.8zzZSfULddSEQCK3PPJyV_cUlI1wbZXWAPdAEWWJTos",
                  id: "5e95f008b0b2f500049b48da"
                };
              }
            })
          );
        }
      }
      let p = new Promise(resolve => {
        resolve({
          ok: true,
          Id: "123",
          json: function() {
            return {
              following: [],
              name: "test111",
              email: "test111@gmail.com",
              token:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTk1ZjAwOGIwYjJmNTAwMDQ5YjQ4ZGEiLCJleHAiOjE1ODcxODgyMTExODB9.TEXOAQ2UmYdE6zrtQNebxZOIsYMhiTfXQd2oof9v14E",
              id: "5e95f008b0b2f500049b48da"
            };
          }
        });
      });
      return p;
    });
  });

  it("check invalid user and password return error", async () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount(Login, {
      localVue,
      router
    });
    wrapper.setData({
      email: "wrong@gmail.com",
      password: "wrong"
    });
    wrapper.vm.login();
    await flushPromises();
    // wrapper.vm.error === true
    expect(wrapper.vm.error).toBe(true);
    expect(wrapper.vm.success).toBe(false);
  });

  it("check valid user and password return success", async () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount(Login, {
      localVue,
      router
    });
    wrapper.setData({
      email: "test111@gmail.com",
      password: "123"
    });
    wrapper.vm.login();
    await flushPromises();
    expect(wrapper.vm.success).toBe(true);
    expect(wrapper.vm.error).toBe(false);
  });
});
