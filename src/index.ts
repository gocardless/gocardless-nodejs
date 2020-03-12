'use strict';

import { GoCardlessClient } from './goCardlessClient';

const initialiser = function(token, envrionment, options = {}) {
  return new GoCardlessClient(token, envrionment, options);
};

module.exports = initialiser;
