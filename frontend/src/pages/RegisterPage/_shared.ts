import { createSignal } from "solid-js";

// Types
export type AccountType = "patient" | "nurse";

// State
export const [ref, setRef] = createSignal<HTMLDivElement>();
export const [page, setPage] = createSignal<number>(0);
export const [accountType, setAccountType] = createSignal<AccountType>();
