import { io } from "socket.io-client";
import { createSignal } from "solid-js";
import { api } from "../api/api";

export const [socket, setSocket] = createSignal(io(api));
