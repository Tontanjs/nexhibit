"use client";

import { useEffect, useRef } from "react";
import { createElement } from "react";
import "number-flow";
import { useInView } from "react-intersection-observer";

type NumberFlowElement = HTMLElement & {
  update: (value?: number) => void;
  format?: Intl.NumberFormatOptions;
  locales?: Intl.LocalesArgument;
  numberSuffix?: string;
};

export function CountUp({
  value,
  suffix = "",
  className,
  format,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  className?: string;
  format?: Intl.NumberFormatOptions;
  delay?: number;
}) {
  const flowRef = useRef<NumberFlowElement | null>(null);
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) {
      return;
    }
    flow.format = format;
    flow.numberSuffix = suffix;
    flow.update(0);
  }, [format, suffix]);

  useEffect(() => {
    if (!inView) {
      return;
    }
    const timeout = window.setTimeout(() => {
      flowRef.current?.update(value);
    }, delay * 1000);

    return () => window.clearTimeout(timeout);
  }, [delay, inView, value]);

  return (
    <span ref={ref} className={className}>
      {createElement("number-flow", { ref: flowRef, "aria-label": `${value}${suffix}` })}
    </span>
  );
}
