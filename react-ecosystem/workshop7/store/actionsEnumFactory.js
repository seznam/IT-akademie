import camelcase from 'lodash.camelcase';

export default function actionsEnumFactory(namespace, ...actionTypes) {
  const actionsEnum = {};
  for (const actionType of actionTypes) {
    const fullActionType = `${namespace}.${actionType}`;
    actionsEnum[actionType] = fullActionType;
    actionsEnum[camelcase(actionType)] = function actionFactory(payload, meta = undefined) {
      const action = {
        type: fullActionType,
        payload,
      };

      if (payload instanceof Error) {
        action.error = true;
      }

      if (meta !== undefined) {
        action.meta = meta;
      }

      return action;
    };
  }
  return actionsEnum;
}
