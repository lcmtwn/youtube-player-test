export default class YouTubePlayer {
  constructor() {
    this.player = $(".html5-video-player");
    this.videoScreen = $(".html5-main-video");
    this.controlBar = $(".ytp-chrome-controls");

    this.captionText = $(".captions-text");
    this.volumeButton = $(".ytp-mute-button");
    this.nextButton = $(".ytp-next-button");
    this.settingsButton = $(".ytp-settings-button");
  }

  async click() {
    await this.player.click();

    // for control bar transition
    await browser.sleep(1000);
  }

  async isControlDisplayed() {
    let controlBarDisplayed = await this.controlBar.isDisplayed();
    return controlBarDisplayed;
  }

  async getVideoSize() {
    let sizeObj = await this.videoScreen.getSize();
    return sizeObj;
  }

  // click button to change mode between default/cinema
  async switchCinemaMode() {
    const cinemaSizeButton = $(".ytp-size-button");
    await browser.wait(
      ExpectedConditions.elementToBeClickable(cinemaSizeButton),
      20000
    );
    await cinemaSizeButton.click();

    // for screen size transition
    await browser.sleep(3000);
  }

  async switchFullscreenMode() {
    const fullscreenButton = $(".ytp-fullscreen-button");
    await browser.wait(
      ExpectedConditions.elementToBeClickable(fullscreenButton),
      20000
    );
    await fullscreenButton.click();

    // for screen size transition
    await browser.sleep(3000);
  }

  // click button to display/hide caption
  async changeSubtitleSetting() {
    const subtitleButton = $(".ytp-subtitles-button");
    await browser.wait(
      ExpectedConditions.elementToBeClickable(subtitleButton),
      20000
    );

    await subtitleButton.click();
  }

  async isCaptionTextDisplayed() {
    // hack
    await browser.sleep(3000);
    let caption = await this.captionText.isDisplayed();

    return caption;
  }

  async isCaptionTextPresent() {
    let caption = await this.captionText.isPresent();
    return caption;
  }

  async clickVolumeButton() {
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.volumeButton),
      20000
    );
    await this.volumeButton.click();
  }

  async getVolumeButtonTitle() {
    let title = await this.volumeButton.getAttribute("title");
    return title;
  }

  async hoverOnVolumeButton() {
    await browser.actions().mouseMove(this.volumeButton).perform();
  }

  async isVolumeControlDisplayed() {
    const volumeControl = $(".ytp-volume-control-hover");
    let volumeControlDisplayed = await volumeControl.isDisplayed();
    return volumeControlDisplayed;
  }

  async getNextVideoLink() {
    let link = await this.nextButton.getAttribute("href");
    return link;
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async clickSettingsButton() {
    await this.settingsButton.click();
  }

  async getSettingsButtonExpandedValue() {
    let expandedValue = await this.settingsButton.getAttribute("aria-expanded");
    return expandedValue;
  }
}
