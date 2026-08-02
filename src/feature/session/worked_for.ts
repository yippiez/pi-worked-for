/**Duration footer text that shows how long an agent turn took. */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { RenderTheme } from "../../outline/render_types.ts";
import { TimeFormatDuration } from "../../time.ts";


// ========================================
// Module State

interface WorkedForState {
	startedAt?: number;
	lastWorkedFor?: string;
}

const WORKED_FOR_STATE = Symbol.for("pi-worked-for.state");

function WorkedForStateGet(): WorkedForState {
	const root = globalThis as typeof globalThis & { [WORKED_FOR_STATE]?: WorkedForState };
	return root[WORKED_FOR_STATE] ??= {};
}


// ========================================
// Public Helpers

/** Return formatted "worked for 1m 23s" text, or undefined when nothing to show.
 *
 * Example:
 * >>> undefined
 * undefined
 */
export function GetWorkedForText(theme: RenderTheme): string | undefined {
	const { lastWorkedFor } = WorkedForStateGet();
	if (!lastWorkedFor) {
  return undefined;
}
	return theme.fg("muted", ` worked for ${lastWorkedFor}`);
}


// ========================================
// Lifecycle Handlers


/** Clear the worked-for footer text when the user types. */
export function WorkedForOnInput(_ctx: ExtensionContext) {
	WorkedForStateGet().lastWorkedFor = undefined;
}


/** Clear the worked-for footer text before compaction. */
export function WorkedForOnSessionBeforeCompact(_ctx: ExtensionContext) {
	WorkedForStateGet().lastWorkedFor = undefined;
}


/** Clear the worked-for footer text after compaction. */
export function WorkedForOnSessionCompact(_ctx: ExtensionContext) {
	WorkedForStateGet().lastWorkedFor = undefined;
}


/** Start the turn timer and clear any stale duration. */
export function WorkedForOnAgentStart(_ctx: ExtensionContext) {
	WorkedForStateGet().lastWorkedFor = undefined;
	WorkedForStateGet().startedAt = Date.now();
}


/** Record elapsed time for the completed turn. */
export function WorkedForOnAgentEnd(_ctx: ExtensionContext) {
	const state = WorkedForStateGet();
	const startedAtValue = state.startedAt;
	state.startedAt = undefined;
	if (!startedAtValue) {
  return;
}

	state.lastWorkedFor = TimeFormatDuration(Date.now() - startedAtValue);
}


/** Clear the worked-for footer text on shutdown. */
export function WorkedForOnSessionShutdown(_ctx: ExtensionContext) {
	const state = WorkedForStateGet();
	state.startedAt = undefined;
	state.lastWorkedFor = undefined;
}
