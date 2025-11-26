"use client"

import { useStore as useZustandStore, StoreApi } from "zustand";

const useStore = <T, S>(
    storeApi: StoreApi<T>,
    selector: (state: T) => S
) => {
    return useZustandStore(storeApi, selector);
};

export default useStore;