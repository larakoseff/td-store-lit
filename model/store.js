import { Action } from "./actions.js";
import { reducer } from "./reducers.js";
/**
 * @typedef {object} Task
 * @prop {string} id
 * @prop {string} title
 * @prop {Date} created
 */

export const Task = {};

/**
 * @prop {'A-Z' | 'Z-A'} Sorting
 */

export const Sorting = {};

/**
 * @typedef {object} Filters
 * @prop {Sorting} sorting
 */

export const State = {};

/**
 * @typedef {object} State
 * @prop {'idle' | 'adding'} phase
 * @prop {Record<string, Task>} tasks
 * @prop {Filters} filters
 */

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback EmptyFn
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 * @return {EmptyFn}
 */

/**
 * @type {Array<Subscription>}
 */
let subscribers = [];

/**
 * @type {Array<State>}
 */
const states = [];

/**
 * @return {State}
 */
export const getState = () => {
  return Object.freeze({ ...states[0] });
};

/**
 * @param {Action} action
 */
export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action);
  states.unshift(next);
};

/**
 * @param {Subscription} subscription
 */
export const subscribe = (subscription) => {
  subscribers.push(subscription);
  const handler = (item) => item !== subscription;

  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(handler);
    subscribers = newSubscribers;
  };

  return unsubscribe;
};

/**
 * @typedef {object} Store
 * @prop {GetState} getState
 * @prop {Subscription} subcribe
 * @prop {Dispatch} dispatch
 */
