import { io } from "socket.io-client";
import { createSignal } from "solid-js";

export const [socket, setSocker] = createSignal(io("localhost:5000"));
