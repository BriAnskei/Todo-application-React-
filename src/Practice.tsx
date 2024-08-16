import React, { useEffect, useReducer, useState } from "react";

type State = { count: number };
type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

const ACTIONS: Record<Action["type"], Action["type"]> = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count + 1 };
    default:
      return state;
  }
}

export default function Practice() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  };
  const decrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };

  return (
    <>
      <button onClick={increment}>+</button>
      <span>{state.count}</span>
      <button onClick={decrement}>-</button>
    </>
  );
}
