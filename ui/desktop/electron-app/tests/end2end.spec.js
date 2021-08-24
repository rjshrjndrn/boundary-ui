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

test.afterEach(async () => {
  electronApp.close();
  electronApp = null; // Not sure we should do this.
});

test.describe('Basic end to end test for electron', async () => {
  test('The app opens succesfully', async () => {
    const boundaryWindow = await electronApp.firstWindow(); // The window that contains the app.
    // Override local storage origin
    await boundaryWindow.evaluate(() =>
      window.localStorage.setItem('desktop:origin', null)
    );
    const windowCount = electronApp.windows().length; // Total electron windows open.

    expect(windowCount).toEqual(1); // To have just one window
    expect(await boundaryWindow.title()).toEqual('Boundary'); // The app title is Boundary.
    expect(await boundaryWindow.innerText('h2')).toEqual('Welcome to Boundary'); // We are on the set origin screen, first screen of the app.
  });

  test('Connects to Boundary and login', async () => {
    const boundaryWindow = await electronApp.firstWindow(); // The window that contains the app.
    // Override local storage origin
    await boundaryWindow.evaluate(() =>
      window.localStorage.setItem('desktop:origin', null)
    );
    const originValue = 'http://localhost:9200';
    const authLoginNameValue = 'admin';
    const authLoginPasswordValue = 'password';

    // Fill the origin input
    await boundaryWindow.fill('.ember-text-field', originValue);

    // Click the submit button
    // Due to an error with await boundaryWindow.click('button[type="submit"]'); we are using a workaround.
    // More info about it here: https://github.com/microsoft/playwright/issues/1808
    await boundaryWindow.$eval('button[type="submit"]', (element) =>
      element.click()
    );
    // Fill user & password
    await boundaryWindow.fill('[name="identification"]', authLoginNameValue);
    await boundaryWindow.fill('[name="password"]', authLoginPasswordValue);

    // Click submit
    await boundaryWindow.$eval('button[type="submit"]', (element) =>
      element.click()
    );
    await boundaryWindow.waitForSelector('h2 >> text=Targets');
    console.log()

    expect(await boundaryWindow.innerText('h2 >> text=Targets')).toEqual('Targets ');
  });
});
