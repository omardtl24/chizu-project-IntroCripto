import { createTRPCReact } from "@trpc/react-query"
import type { Approuter } from "./"

export const trpc = createTRPCReact<Approuter>({})