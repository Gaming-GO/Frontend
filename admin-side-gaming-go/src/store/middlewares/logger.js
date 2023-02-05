export const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next stage', store.getState())
    return result
}