/**
 * Created by CCristi on 11/14/16.
 */

'use strict';

import {StrategyFactory as RetryStrategyFactory} from './RetryStrategy/StrategyFactory';

export class RetryManager {
  constructor(strategies) {
    this._strategies = strategies.map(RetryStrategyFactory.create);
    this._count = 0;
  }

  /**
   * @param {String|Function} strategy
   * @returns {RetryManager}
   */
  addStrategy(strategy) {
    this._strategies.push(RetryStrategyFactory.create(strategy));
    return this;
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  decide(response) {
    return this._strategies.reduce((decideBool, strategy) => {
      return decideBool || strategy.decide(response);
    }, false) && --this._count > 0;
  }

  /**
   * @param {Number} count
   */
  set count(count) {
    this._count = count;
  }

  /**
   * @returns {Number}
   */
  get count() {
    return this._count;
  }
}

