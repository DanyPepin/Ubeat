import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import PlayList from "@/components/PlayList.vue";
import PlaylistTracks from "@/components/PlaylistTracks.vue";
import addTracksPlaylist from "@/components/addTracksPlaylist.vue";

describe("PlayList component test", () => {
  beforeEach(() => {
    // mimic fetch
    global.fetch = jest.fn().mockImplementation(url => {
      // check url and dta
      if (url.indexOf("http://ubeat.herokuapp.com/users/") === 0) {
        return new Promise(resolve =>
          resolve({
            ok: true,
            id: "678",
            json: function() {
              return {
                playlists: []
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
    wrapper = shallowMount(PlayList, {
      localVue
    });
  });
  it("check if child component PlaylistTracks exists", () => {
    expect(wrapper.contains(PlaylistTracks)).toBe(true);
  });

  it("check if child component addTracksPlaylist exists", () => {
    expect(wrapper.contains(addTracksPlaylist)).toBe(true);
  });
});
