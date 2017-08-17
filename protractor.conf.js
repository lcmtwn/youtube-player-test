"use strict";

require("babel-register");
require("babel-polyfill");
require("app-module-path/register");

let SpecReporter = require("jasmine-spec-reporter").SpecReporter;

var config = {
  baseUrl: process.env.baseUrl || "https://www.youtube.com",
  framework: "jasmine",
  seleniumAddress:
    process.env.SELENIUM_HUB_URL || "http://localhost:4444/wd/hub",
  maxSession: 1,
  multiCapabilities: [
    {
      browserName: "chrome",
      version: "latest",
      name: "chrome",
      chromeOptions: {
        args: ["start-fullscreen"]
      }
    }
  ],
  suites: {
    player: ["tests/*.spec.js"]
  },
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare: function() {
    browser.ignoreSynchronization = true;

    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      })
    );
  },
  plugins: [
    {
      package: "protractor-screenshot-plugin",
      folder: "screenshots",
      takeOnAllCases: false
    }
  ]
};

exports.config = config;
