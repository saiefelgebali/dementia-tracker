import { createSignal } from "solid-js";
import { AccountType } from "./_shared";

export const [page, setPage] = createSignal<number>(0);
export const [accountType, setAccountType] = createSignal<AccountType>();
export const [email, setEmail] = createSignal<string>("");
export const [password, setPassword] = createSignal<string>("");
