import log from './logger.js';
import extractPlistEntry from './extract';


async function extractBundleId (app) {
  let bundleId = await extractPlistEntry(app, 'CFBundleIdentifier');
  log.debug(`Getting bundle ID from app '${app}': '${bundleId}'`);
  return bundleId;
}


export default extractBundleId;
