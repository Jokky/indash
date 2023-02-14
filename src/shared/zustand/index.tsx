import {
    Context,
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { StoreApi, useStore } from 'zustand';

interface CreateStoreProviderProps<S> {
    state: S;
    children: ReactNode;
}

export const CreateStoreProvider = <S,>(
    store: StoreApi<S>,
): [Context<StoreApi<S>>, FC<CreateStoreProviderProps<S>>] => {
    const StoreContext = createContext<StoreApi<S>>(store);

    const StoreProvider: FC<CreateStoreProviderProps<S>> = ({
        state,
        children,
    }) => {
        const initRef = useRef(false);

        useEffect(() => {
            if (!initRef.current) {
                initRef.current = true;
                store.setState(state);
            }
        }, [initRef, state]);

        return (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        );
    };

    return [StoreContext, StoreProvider];
};

export const useCreateStore = <S,>(
    store: StoreApi<S>,
    context: Context<StoreApi<S>>,
): S => {
    const createdStore = useContext(context);

    return useStore(createdStore);
};
