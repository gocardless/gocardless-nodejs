'use strict';

import { GoCardlessClient } from './GoCardlessClient';

const initialiser = function(token, envrionment, options = {}) {
  return new GoCardlessClient(token, envrionment, options);
};

module.exports = initialiser;
