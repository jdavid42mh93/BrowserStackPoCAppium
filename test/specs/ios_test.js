import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('BrowserStack Local Testing', () => {
  it('can check tunnel working', async () => {
    var searchSelector = await $(`~Test BrowserStackLocal connection`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    var textElements = await $(`~ResultBrowserStackLocal`);
    await textElements.waitForDisplayed({ timeout: 30000 });

    var testElement = null;

    var textContent = await textElements.getText();
    if (textContent.indexOf('Up and running') !== -1) {
      testElement = textElements;
    }

    if (testElement === null) {
      var screenshotPath = path.resolve(__dirname, 'screenshot.png');
      await browser.saveScreenshot(screenshotPath);
      console.log('Screenshot stored at ' + screenshotPath);
      throw new Error('Cannot find the Up and running response');
    }

    var matchedString = await testElement.getText();
    assert(matchedString == 'Up and running');
  });
});
