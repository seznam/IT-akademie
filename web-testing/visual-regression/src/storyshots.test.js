import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import path from 'path';
import * as devices from 'puppeteer/DeviceDescriptors';

const iPhone = devices['iPhone 6'];

const sharedConfig = {
    // storybookUrl: `file://${path.resolve('storybook-static')}`
    storybookUrl: 'http://localhost:9009/'
};

function customizePage(page) {
  return page.emulate(iPhone);
}

initStoryshots({
    suite: 'Desktop storyshots',
    test: imageSnapshot(sharedConfig)
});

initStoryshots({
    suite: 'Mobile storyshots',
    test: imageSnapshot({
        customizePage,
        ...sharedConfig
    })
});
