const QUnit = require('qunit');
const path = require('path');
const Application = require('spectron').Application;
const electronPath = require('electron');

QUnit.module('Initial end to end testing', async function (hooks) {
  let app = null;
  hooks.beforeEach(async function () {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')],
      env: {
        NODE_ENV: 'test',
        BYPASS_APP_UPDATER: true,
      },
      chromeDriverArgs: ['--no-sandbox'],
      chromeDriverLogPath: 'chromedriverlog.json',
    });
    await app.start();
  });

  hooks.afterEach(async function () {
    if (app && app.isRunning()) {
      await app.stop();
    }
  });

  QUnit.test('First test', async function (assert) {
    assert.equal(1, 1);
  });

  QUnit.test('Second test', async function (assert) {
    const windowTitle = await app.client.getTitle();
    console.log('Window title: ', windowTitle);
    assert.equal(1, 1);
  });
});
