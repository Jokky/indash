import { useEffect, useRef } from 'react';
import { noop } from '@/shared/lib';

type PromiseOrVoid = Promise<void> | void;

interface UseSSEParams {
    onData: (event: MessageEvent) => PromiseOrVoid;
    onError?: (error: Event) => PromiseOrVoid;
}

const getEventSource = (url: string) => () => new EventSource(url);

export const useSSE = (url: string, params?: UseSSEParams) => {
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        eventSourceRef.current?.close();

        const es = getEventSource(url)();
        es.onmessage = params?.onData || noop;
        es.onerror = (event) => {
            // if (event.eventPhase === EventSource.CLOSED) {
            //     es.close();
            // }
            params?.onError?.(event);
        };

        eventSourceRef.current = es;
    }, [url]);

    return {
        close: eventSourceRef.current?.close,
    };
};
