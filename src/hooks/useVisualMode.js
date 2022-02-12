import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false){
    setMode(mode);
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, -1), mode];
      } else {
        return [...prev, mode];
      }
    });
  }
  function back() {
    if(history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(() => [...newHistory]);
    }
  }

  return{mode, transition, back};
}