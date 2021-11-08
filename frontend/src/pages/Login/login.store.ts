import { createSignal } from "solid-js";

export const [loading, setLoading] = createSignal<boolean>(false);
export const [errors, setErrors] = createSignal<string[]>([]);
