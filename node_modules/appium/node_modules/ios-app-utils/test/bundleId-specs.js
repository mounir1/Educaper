// transpile:mocha

import { extractBundleId } from '../..';
import { absolute } from 'ios-test-app';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';


chai.should();
chai.use(chaiAsPromised);

describe('extractBundleId', () => {
  it('should get bundleId of app', async () => {
    let app = absolute.iphonesimulator;
    let bundleId = await extractBundleId(app);

    bundleId.should.equal('io.appium.TestApp');
  });
});
