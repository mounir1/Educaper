// transpile:mocha

import { extractAppDisplayName } from '../..';
import { absolute } from 'ios-test-app';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);


describe('extractAppDisplayName', () => {
  it('should get application name of app', async () => {

    let app = absolute.iphonesimulator;
    let appName = await extractAppDisplayName(app);

    appName.should.equal('TestApp');
  });
});
