import { useEffect } from "react";

export default function useStopScroll(rule: boolean) {
  useEffect(() => {
    const body = document.body;

    if (rule) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [rule]);
}
