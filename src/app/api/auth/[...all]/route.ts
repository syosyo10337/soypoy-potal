import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/infrastructure/auth/server";

export const { POST, GET } = toNextJsHandler(auth);
