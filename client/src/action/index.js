import streams from '../apis/streams';
import history from '../history';
export const signIn = userId => {
  return {
    type: 'SIGN_IN',
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const logIn = () => {
  return {
    type: 'LOG_IN'
  };
};

//axios ajax actions for streams
/* detailed notation
export const createStream = (formValues) => {
    return (dispatch) => {

    }
}
*/
//simple notation
// the right function is the inner function
// in actions is an good way to use async
// this is an action for server call ajax etc
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  dispatch({ type: 'CREATE_STREAM', payload: response.data });

  //programatic navigate
  history.push('/');
};
export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({ type: 'FETCH_STREAMS', payload: response.data });
};
//fetch a sepcific stream via id
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`streams/${id}`);
  dispatch({ type: 'FETCH_STREAM', payload: response.data });
};
//stream edit
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`streams/${id}`, formValues);
  dispatch({ type: 'EDIT_STREAM', payload: response.data });
  history.push('/');
};
//delete
export const deleteStream = id => async dispatch => {
  await streams.delete(`streams/${id}`);
  dispatch({ type: 'DELETE_STREAM', payload: id });
  history.push('/');
};
