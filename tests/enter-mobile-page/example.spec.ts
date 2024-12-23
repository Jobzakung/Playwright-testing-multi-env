import { test } from '../../fixture/addPage';
import { CHANNELS, URLS } from '../../config/url-config';

test('verify enter mobile page', async ({ enterMobilePage }) => {
  await enterMobilePage.goto(URLS.URL_Register);
  await enterMobilePage.verifyPage();
  await enterMobilePage.verifyHeaderPage();
});

test('verify TMN token page', async ({ enterMobilePage }) => {
  await enterMobilePage.goto(URLS.TMN, { tmnToken: '' });
  await enterMobilePage.verifyPage();
});

test('verify line channel page', async ({ enterMobilePage }) => {
  await enterMobilePage.goto(CHANNELS.LINE, { channel: 'line' });
  await enterMobilePage.verifyPage();
});