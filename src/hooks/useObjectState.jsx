import { useCallback, useState } from "react";

const useObjectState = (defaultState = {}) => {
  const [state, _setState] = useState(defaultState);
  const setState = useCallback((newParams = {}) => {
    _setState((prevState) => ({ ...prevState, ...newParams }));
  }, []);
  const resetState = useCallback(() => {
    _setState(defaultState);
  }, [defaultState]);

  const setStateBlank = useCallback(() => {
    _setState({});
  }, []);
  return [state, setState, resetState, setStateBlank];
};

export default useObjectState;
