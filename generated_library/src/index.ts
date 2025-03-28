'use strict';

import { GoCardlessClient } from './client';

const initialiser = function(token, envrionment, options = {}) {
  return new GoCardlessClient(token, envrionment, options);
};

module.exports = initialiser;
