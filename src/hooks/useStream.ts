import { useEffect } from "react";

type UseStreamOptions = {
  streamApi: string;
  onMessage: (event: MessageEvent) => void;
};

export function useStream(options: UseStreamOptions) {
  // === PROPS ===
  const { streamApi, onMessage } = options;

  // === EFFECT ===
  useEffect(() => {
    const es = new EventSource(streamApi);
    es.onmessage = onMessage;

    es.onerror = () => es.close();

    return () => es.close();
  }, [onMessage, streamApi]);
}
