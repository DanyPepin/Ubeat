import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import User from "@/components/User.vue";

describe("User component test", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(url => {
      if (url.indexOf("http://ubeat.herokuapp.com/users/") === 0) {
        return new Promise(resolve =>
          resolve({
            ok: true,
            id: "678",
            json: function() {
              return {
                users: []
              };
            }
          })
        );
      } else {
        return new Promise((resolve, reject) =>
          reject({
            message: "Url Not Found!"
          })
        );
      }
    });
  });
  let name = "Virginie";
  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    wrapper = shallowMount(User, {
      localVue,
      propsData: {
        user: {
          name:name,
        }
      }
    });
  });
  test("check props render the name of the user", () => {
    expect(wrapper.text()).toContain(name);
  });
});
