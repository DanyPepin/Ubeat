import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";

import data from "./fakeDataAlbum";
import AlbumTemplate from "@/components/AlbumTemplate.vue";

describe("AlbumTemplate component test", () => {
  beforeEach(() => {
    // mimic fetch
    global.fetch = jest.fn().mockImplementation(url => {
      // check url and dta
      if (url.indexOf("http://ubeat.herokuapp.com/search/albums?q=") === 0) {
        return new Promise(resolve =>
          resolve({
            ok: true,
            id: "678",
            json: () => data.results
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
  let artistName = "Blink-182";
  let collectionName = "Enema of the State";
  let collectionViewUrl =
    "https://itunes.apple.com/us/album/enema-of-the-state/id325483?uo=4";
  let artworkUrl100 =
    "http://a2.mzstatic.com/us/r30/Features/cb/72/0e/dj.aoonomrr.100x100-75.jpg";
  let primaryGenreName = "Alternative";
  let trackCount = 12;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    wrapper = shallowMount(AlbumTemplate, {
      localVue,
      propsData: {
        album: {
          artistName: artistName,
          collectionName: collectionName,
          collectionViewUrl: collectionViewUrl,
          artworkUrl100: artworkUrl100,
          primaryGenreName: primaryGenreName,
          trackCount: trackCount
        }
      }
    });
  });
  test("check props render artistName", () => {
    expect(wrapper.text()).toContain(artistName);
  });
  test("check props render collectionName", () => {
    expect(wrapper.text()).toContain(collectionName);
  });

  test("check props render collectionViewUrl", () => {
    expect(wrapper.vm.album.collectionViewUrl).toBe(collectionViewUrl);
  });
  test("check props render artworkUrl100", () => {
    expect(wrapper.vm.album.artworkUrl100).toBe(artworkUrl100);
  });
  test("check props render primaryGenreName", () => {
    expect(wrapper.text()).toContain(primaryGenreName);
  });
  test("check props render trackCount", () => {
    expect(trackCount).toEqual(trackCount);
  });

  test("AlbumTemplate is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
