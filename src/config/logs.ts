import logs from 'debug';

const info = logs('app:info');
const warn = info.extend('app:warn');
const debug = warn.extend('app:debug');
const error = debug.extend('app:error');

export { info, warn, debug, error };
