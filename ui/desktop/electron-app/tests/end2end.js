const QUnit = require('qunit');
const Application = require('spectron').Application;

QUnit.module('Initial end to end testing', async function (hooks) {
  let app = null;
  hooks.beforeEach(async function () {
    app = new Application({
      // path: '/Applications/Boundary.app/Contents/MacOS/Boundary'
      path: 'out/Boundary-darwin-arm64/Boundary.app/Contents/MacOS/Boundary',
      env: {
        NODE_ENV: 'test',
        BYPASS_APP_UPDATER: true,
      },
      requireName: 'electronRequire',
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

  QUnit.test('The app opens succesfully', async function (assert) {
    const windowCount = await app.client.getWindowCount();
    const windowTitle = await app.client.getTitle();
    assert.equal(windowCount, 1, 'There is just 1 window open');
    assert.equal(windowTitle, 'Boundary');

    // This pause is for demo purposes
    // await app.client.pause(1000);
  });

  QUnit.test('Connects to Boundary and login', async function (assert) {
    // Add the origin and submit the form
    const originInputElement = await app.client.$('.ember-text-field');
    const originSubmitButton = await app.client.$('form button');
    const originValue = 'http://localhost:9200';
    const authLoginNameValue = 'admin';
    const authLoginPasswordValue = 'password';

    // Set origin
    const originH2 = await app.client.$('h2');
    assert.equal(
      await originH2.getText(),
      'Welcome to Boundary',
      'Making sure we are at set origin form'
    );
    await originInputElement.setValue(originValue);
    assert.equal(await originSubmitButton.getText(), 'Submit');
    await originSubmitButton.click();

    // Authenticate
    const authH2 = await app.client.$('h2=Authenticate');
    await authH2.waitForExist({ timeout: 500 });
    assert.equal(
      await authH2.getText(),
      'Authenticate',
      'Checks we are in authenticate form'
    );

    const authTabsPasswordElement = await app.client.$('nav a:nth-child(1)');
    assert.equal(
      await authTabsPasswordElement.getText(),
      'Password',
      'Makes sure we are authenticating with password method'
    );
    await authTabsPasswordElement.click();

    const authLoginNameElement = await app.client.$('[name="identification"]');
    const authLoginPasswordElement = await app.client.$('[name="password"]');

    await authLoginNameElement.setValue(authLoginNameValue);
    await authLoginPasswordElement.setValue(authLoginPasswordValue);

    const authSubmitButton = await app.client.$('form button');
    await authSubmitButton.click();

    // This pause is for demo purposes
    // await app.client.pause(2000);
  });
});
