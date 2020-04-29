import { shallowMount, createLocalVue } from "@vue/test-utils";
import addTracksPlaylist from "@/components/addTracksPlaylist.vue";
import Buefy from "buefy";
import flushPromises from "flush-promises";
import router from "@/router";
import data from "./fakeDataAddTrackPlaylist";

describe("addTracksPlaylist component test", () => {
  beforeEach(() => {
    // mimic fetch
    global.fetch = jest.fn().mockImplementation(url => {
      // check url and dta
      if (url.indexOf("http://ubeat.herokuapp.com/search/tracks?q=") === 0) {
        return new Promise(resolve =>
          resolve({
            ok: true,
            id: "678",
            json: () => data.tracks
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
  it("search method return data", async () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount(addTracksPlaylist, {
      localVue,
      router
    });
    wrapper.setData({
      term: "test"
    });
    wrapper.vm.search();
    await flushPromises();
    expect(wrapper.vm.results.length).toBe(200);
  });

  it('Check emitted "addTrack" event', () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount(addTracksPlaylist, {
      localVue,
      router
    });

    wrapper.vm.$emit("addTrack", "blabla");
    expect(wrapper.emitted().addTrack).toBeTruthy();
  });
});
