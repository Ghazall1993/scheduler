import {React, useState} from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(replace? [...history.slice(0, -1), newMode] : [...history, newMode])
  }

  function back() {
    if (mode !== initial) {
      setMode(history[history.length - 2])
      setHistory(history.slice(0, -1));
    }
  }
  return { mode,transition,back };
}



