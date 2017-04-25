import log from './logger.js';
import extractPlistEntry from './extract';


async function extractAppDisplayName (app) {
  log.debug("Getting application name from app");
  return await extractPlistEntry(app, 'CFBundleDisplayName');
}


export default extractAppDisplayName;
