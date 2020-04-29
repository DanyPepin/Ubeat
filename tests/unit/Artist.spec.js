import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import Artist from "@/components/Artist.vue";
import ArtistCard from "@/components/ArtistCard.vue";

describe("Artist component test", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(url => {
      if (url.indexOf("http://ubeat.herokuapp.com/artists/") === 0) {
        return new Promise(resolve =>
          resolve({
            ok: true,
            id: "678",
            json: function() {
              return {
                artists: []
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

  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    wrapper = shallowMount(Artist, {
      localVue
    });
  });
  it("check if child component ArtistCard exists", () => {
    expect(wrapper.contains(ArtistCard)).toBe(true);
  });
});
