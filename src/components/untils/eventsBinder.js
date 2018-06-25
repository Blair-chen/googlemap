/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

import _ from 'lodash'
/**监听时间events集合里面的所有时间，执行相应的emit */
export default (vueElement, googleMapObject, events) => {
  _.forEach(events, (eventName) => {
    const exposedName = 'g-' + eventName;
    googleMapObject.addListener(eventName, (ev) => {
      vueElement.$emit(exposedName, ev);
    });
  });
}

