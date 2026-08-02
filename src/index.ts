import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { WorkedForOnAgentEnd, WorkedForOnAgentStart, WorkedForOnInput, WorkedForOnSessionBeforeCompact, WorkedForOnSessionCompact, WorkedForOnSessionShutdown } from "./feature/session/worked_for.ts";

export default function PiWorkedForRegister(pi: ExtensionAPI): void {
	pi.on("input", async (_event, ctx) => { WorkedForOnInput(ctx); });
	pi.on("agent_start", async (_event, ctx) => { WorkedForOnAgentStart(ctx); });
	pi.on("agent_end", async (_event, ctx) => { WorkedForOnAgentEnd(ctx); });
	pi.on("session_before_compact", async (_event, ctx) => { WorkedForOnSessionBeforeCompact(ctx); });
	pi.on("session_compact", async (_event, ctx) => { WorkedForOnSessionCompact(ctx); });
	pi.on("session_shutdown", async (_event, ctx) => { WorkedForOnSessionShutdown(ctx); });
}
