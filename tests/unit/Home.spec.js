import { mount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import Home from "@/components/Home.vue";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("Home component unit test", () => {
  test("Home is a vue instance", () => {
    const wrapper = mount(Home, {
      localVue,
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
