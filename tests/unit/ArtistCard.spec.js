import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import ArtistCard from "@/components/ArtistCard.vue";

describe("ArtistCard component unit test", () => {
  let wrapper;
  let artistName = "Metallica";
  let primaryGenreName = "Rock";
  let artistLinkUrl =
    "https://itunes.apple.com/us/artist/metallica/id3996865?uo=4";
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    wrapper = shallowMount(ArtistCard, {
      localVue,
      propsData: {
        artist: {
          artistName: artistName,
          primaryGenreName: primaryGenreName,
          artistLinkUrl: artistLinkUrl
        }
      }
    });
  });
  test("check props render artistName", () => {
    expect(wrapper.text()).toContain(artistName);
  });
  test("check props render primaryGenreName", () => {
    expect(wrapper.text()).toContain(primaryGenreName);
  });
  test("check props render artistLinkUrl", () => {
    expect(wrapper.vm.artist.artistLinkUrl).toBe(artistLinkUrl);
  });

  test("ArtistCard is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
