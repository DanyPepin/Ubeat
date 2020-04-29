import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import SongPlayer from "@/components/SongPlayer.vue";

describe("SongPlayer component unit test", () => {
  let wrapper;
  let previewUrl =
    "http://a1815.phobos.apple.com/us/r1000/101/Music/70/f0/fd/mzm.hhpjhkpl.aac.p.m4a";

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    wrapper = shallowMount(SongPlayer, {
      localVue,
      propsData: {
        previewUrl
      }
    });
  });
  test("check props render previewUrl", () => {
    expect(wrapper.vm.previewUrl).toBe(previewUrl);
  });
  test("SongPlayer is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
