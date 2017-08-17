import YouTubePage from "pages/yt.page";

const url = "/watch?v=DdSBt_KRhXM";
let ytPage;
let player;

describe("YouTube video page test", () => {
  beforeAll(async () => {
    ytPage = new YouTubePage();
    player = ytPage.getPlayer();

    await ytPage.open(url);
  });

  describe("check ads placement on the page", async () => {
    beforeAll(async () => {
      await ytPage.reload();

      // for embedded ad display, also skip ad in the beginning if any
      await browser.sleep(40000);
    });

    it("GoogleAd is presented on DOM", async () => {
      let googleAdPresented = await ytPage.isGoogleAdPresented();
      expect(googleAdPresented).toBe(true);
    });

    it("embedded Ad of video is displayed after video is played for a period of time", async () => {
      let embeddedAdDisplayed = await ytPage.isEmbeddedAdDisplayed();
      expect(embeddedAdDisplayed).toBe(true);
    });
  });

  describe("check sidebar module", async () => {
    beforeAll(async () => {
      await ytPage.reload();

      // stop video play
      await player.click();
    });

    it("sidebar module is displayed", async () => {
      let sidebarModuleDisplayed = await ytPage.isSidebarModuleDisplayed();
      expect(sidebarModuleDisplayed).toBe(true);
    });

    describe("check autoplay section", async () => {
      it("autoplay bar is displayed", async () => {
        let autoplayBarDisplayed = await ytPage.isAutoplayBarDisplayed();
        expect(autoplayBarDisplayed).toBe(true);
      });

      it("one autoplay video is displayed", async () => {
        let autoplayVideosCount = await ytPage.getAutoplayVideosCount();
        expect(autoplayVideosCount).toBe(1);
      });
    });

    describe("check sidebar section", async () => {
      it("sidebar section is displayed", async () => {
        let sidebarSectionDisplayed = await ytPage.isSidebarSectionDisplayed();
        expect(sidebarSectionDisplayed).toBe(true);
      });

      it("related video list is not empty", async () => {
        let relatedVideosCount = await ytPage.getRelatedVideosCount();
        expect(relatedVideosCount).toBeGreaterThan(0);
      });
    });
  });

  describe("check player control bar", async () => {
    beforeAll(async () => {
      await ytPage.reload();

      // stop video play
      await player.click();
    });

    it("player control bar is displayed by default", async () => {
      let controlBarDisplayed = await player.isControlDisplayed();
      expect(controlBarDisplayed).toBe(true);
    });

    it("player control bar is not displayed after video is played for a period of time", async () => {
      await ytPage.reload();

      // for control bar transition
      await browser.sleep(5000);

      let controlBarDisplayed = await player.isControlDisplayed();
      expect(controlBarDisplayed).toBe(false);
    });
  });

  describe("check video size change", async () => {
    let defaultVideoSize;
    let cinemaVideoSize;

    describe("change between default mode to cinema mode", async () => {
      beforeAll(async () => {
        await ytPage.reload();

        // stop video play
        await player.click();
        defaultVideoSize = await player.getVideoSize();
      });

      it("click cinema button to change player to cinema mode", async () => {
        await player.switchCinemaMode();
        cinemaVideoSize = await player.getVideoSize();

        expect(cinemaVideoSize.height).toBeGreaterThan(defaultVideoSize.height);
        expect(cinemaVideoSize.width).toBeGreaterThan(defaultVideoSize.width);
      });

      it("click cinema button to change back to default mode", async () => {
        await player.switchCinemaMode();
        let videoSize = await player.getVideoSize();

        expect(videoSize.height).toBe(defaultVideoSize.height);
        expect(videoSize.width).toBe(defaultVideoSize.width);
      });
    });

    describe("change between default mode to fullscreen mode", async () => {
      beforeAll(async () => {
        await ytPage.reload();

        // stop video play
        await player.click();
      });

      it("click fullscreen button to change player to fullscreen mode", async () => {
        await player.switchFullscreenMode();
        let videoSize = await player.getVideoSize();

        expect(videoSize.height).toBeGreaterThan(defaultVideoSize.height);
        expect(videoSize.width).toBeGreaterThan(defaultVideoSize.width);
      });

      it("click fullscreen button to change back to default mode", async () => {
        await player.switchFullscreenMode();
        let videoSize = await player.getVideoSize();

        expect(videoSize.height).toBe(defaultVideoSize.height);
        expect(videoSize.width).toBe(defaultVideoSize.width);
      });
    });

    describe("change between cinema mode to fullscreen mode", async () => {
      beforeAll(async () => {
        await ytPage.reload();

        // stop video play
        await player.click();
        await player.switchCinemaMode();
      });

      it("click fullscreen button to change player to fullscreen mode", async () => {
        await player.switchFullscreenMode();
        let videoSize = await player.getVideoSize();

        expect(videoSize.height).toBeGreaterThan(cinemaVideoSize.height);
        expect(videoSize.width).toBeGreaterThan(cinemaVideoSize.width);
      });

      it("click fullscreen button to change back to default mode", async () => {
        await player.switchFullscreenMode();
        let videoSize = await player.getVideoSize();

        expect(videoSize.height).toBe(cinemaVideoSize.height);
        expect(videoSize.width).toBe(cinemaVideoSize.width);
      });

      afterAll(async () => {
        // change back to default mode
        await player.switchCinemaMode();
      });
    });
  });

  describe("check caption text display", async () => {
    beforeAll(async () => {
      await ytPage.reload();

      // wait for narative
      await browser.sleep(20000);

      // stop video play
      await player.click();
    });

    it("caption is not displayed by default", async () => {
      let captionText = await player.isCaptionTextPresent();
      expect(captionText).toBe(false);
    });

    it("click subtitle button to display caption", async () => {
      await player.changeSubtitleSetting();
      let captionText = await player.isCaptionTextDisplayed();

      expect(captionText).toBe(true);
    });

    it("click subtitle button to hide caption", async () => {
      await player.changeSubtitleSetting();
      let captionText = await player.isCaptionTextPresent();

      expect(captionText).toBe(false);
    });
  });

  describe("check volume button", async () => {
    beforeAll(async () => {
      await ytPage.reload();

      // stop video play
      await player.click();
    });

    it("check default title of volume button is Mute", async () => {
      let title = await player.getVolumeButtonTitle();
      expect(title).toBe("Mute");
    });

    it("check volume control is displayed while mouse hovers on volume button", async () => {
      await player.hoverOnVolumeButton();
      let volumeControlDisplayed = await player.isVolumeControlDisplayed();
      expect(volumeControlDisplayed).toBe(true);
    });
  });

  describe("check settings button value", async () => {
    beforeAll(async () => {
      await ytPage.reload();

      // stop video play
      await player.click();
    });

    it("by defualt expanded value is not present", async () => {
      let expandedValue = await player.getSettingsButtonExpandedValue();
      expect(expandedValue).toBe(null);
    });

    it("expanded value is true after settings button is clicked", async () => {
      await player.clickSettingsButton();
      let expandedValue = await player.getSettingsButtonExpandedValue();
      expect(expandedValue).toBe("true");
    });
  });

  describe("check next video setting", async () => {
    let nextVideoLink;

    beforeAll(async () => {
      await ytPage.reload();

      // stop video play
      await player.click();
    });

    it("next video link set in player is the same as that set in autoplay video", async () => {
      nextVideoLink = await player.getNextVideoLink();
      let autoplayVideoLink = await ytPage.getAutoplayVideoLink();
      expect(nextVideoLink).toBe(autoplayVideoLink);
    });

    it("redirect to next video correctly", async () => {
      await player.clickNextButton();
      let pageUrl = await ytPage.getUrl();
      expect(pageUrl).toBe(nextVideoLink);
    });

    afterAll(async () => {
      await ytPage.open(url);
    });
  });
});
