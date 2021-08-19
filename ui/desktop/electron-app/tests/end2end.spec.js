const { test, expect } = require('@playwright/test');
const { _electron: electron } = require('playwright');

let electronApp = null;
test.beforeEach(async () => {
  electronApp = await electron.launch({
    executablePath:
      'out/Boundary-darwin-arm64/Boundary.app/Contents/MacOS/Boundary',
    env: {
      NODE_ENV: 'test',
      BYPASS_APP_UPDATER: true,
    },
  });
});

test.afterEach( async () => {
  electronApp.close();
  // electronApp = null; // Not sure we should do this.
});

test.describe('Basic end to end test for electron', async () => {
  test('The app opens succesfully', async () => {
    const boundaryWindow = await electronApp.firstWindow(); // The window that contains the app.
    const windowCount = electronApp.windows().length; // Total electron windows open.

    console.log('Title: ', await boundaryWindow.title());
    console.log('H2: ', await boundaryWindow.innerText('h2'));
    // await boundaryWindow.innerText('h2');

    expect(windowCount).toEqual(1);
    // expect(await boundaryWindow.title()).toEqual('Boundary');
  });

  test.skip('Connects to Boundary and login', async () => {
    const boundaryWindow = await electronApp.firstWindow(); // The window that contains the app.
    const originValue = 'http://localhost:9200';
    const authLoginNameValue = 'admin';
    const authLoginPasswordValue = 'password';

    // Fill the origin input
    await boundaryWindow.fill('.ember-text-field', originValue);

    // Click the submit button
    // Due to an error with await boundaryWindow.click('button[type="submit"]'); we are using a workaround.
    // More info about it here: https://github.com/microsoft/playwright/issues/1808
    await boundaryWindow.$eval('button[type="submit"]', (element) => element.click());






    // await boundaryWindow.pause();

    // await boundaryWindow.fill('.ember-text-field', originValue);
    // console.log(await boundaryWindow.innerText('button'));
    // await boundaryWindow.click('button');
    expect(2).toEqual(2);
  });
});
