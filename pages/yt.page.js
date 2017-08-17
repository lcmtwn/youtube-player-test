import Page from "pages/page";
import YouTubePlayer from "pages/ytplayer.module";

export default class YouTubePage extends Page {
  constructor() {
    super();

    this.player = new YouTubePlayer();
    this.googleAd = $("#google_companion_ad_div");
    this.embeddedAd = $(".adDisplay img");

    this.sidebarModule = $("#watch7-sidebar-modules");
    this.autoplayBar = $(".autoplay-bar");
    this.sidebarSection = $(".watch-sidebar-section > .watch-sidebar-body");
  }

  getPlayer() {
    return this.player;
  }

  async getUrl() {
    let url = await browser.getCurrentUrl();
    return url;
  }

  async open(uri = "") {
    let url = uri || "/";
    await browser.get(url);
  }

  async reload() {
    await browser.driver.navigate().refresh();
  }

  async isGoogleAdPresented() {
    let googleAdPresented = await this.googleAd.isPresent();
    return googleAdPresented;
  }

  async isEmbeddedAdDisplayed() {
    let embeddedAdDisplayed = await this.embeddedAd.isDisplayed();
    return embeddedAdDisplayed;
  }

  async isSidebarModuleDisplayed() {
    let sidebarModuleDisplayed = await this.sidebarModule.isDisplayed();
    return sidebarModuleDisplayed;
  }

  async isAutoplayBarDisplayed() {
    let autoplayBarDisplayed = await this.autoplayBar.isDisplayed();
    return autoplayBarDisplayed;
  }

  async isSidebarSectionDisplayed() {
    let sidebarSectionDisplayed = await this.sidebarSection.isDisplayed();
    return sidebarSectionDisplayed;
  }

  async getRelatedVideosCount() {
    const relatedVideos = $$("#watch-related li");
    let count = await relatedVideos.count();
    return count;
  }

  async getAutoplayVideosCount() {
    const autoplayVideos = $$(
      ".autoplay-bar .watch-sidebar-body .video-list-item"
    );
    let count = await autoplayVideos.count();
    return count;
  }

  async getAutoplayVideoLink() {
    // get link of video
    const autoplayVideoLink = $(
      ".autoplay-bar .watch-sidebar-body .video-list-item a.thumb-link"
    );
    let link = await autoplayVideoLink.getAttribute("href");
    return link;
  }
}
