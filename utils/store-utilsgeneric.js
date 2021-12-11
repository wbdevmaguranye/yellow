/**
 * Performs a store action [commit or dispatch].
 * @param {*} param0
 * @param {*} action The action to be performed.
 */
export function performAction({ commit, dispatch }, action) {
  //console.log(action);
  if (action) {
    if (
      action.actionType !== null &&
      action.actionName !== null &&
      action.payload !== null
    ) {
      try {
        const act = action.actionType.toLowerCase()
        if (act === 'dispatch') {
          dispatch(action.actionName, action.payload)
        } else if (act === 'commit') {
          commit(action.actionName, action.payload)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
