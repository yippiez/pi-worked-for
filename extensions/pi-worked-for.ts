import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";

const WIDGET_ID = "pi-worked-for";
const DEFAULT_VISIBLE_MS = 5000;

type State = {
	startedAt: number | undefined;
	clearTimer: NodeJS.Timeout | undefined;
};

const state: State = {
	startedAt: undefined,
	clearTimer: undefined,
};

function getVisibleMs(): number {
	const raw = process.env.PI_WORKED_FOR_VISIBLE_MS;
	if (!raw) return DEFAULT_VISIBLE_MS;
	const parsed = Number(raw);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_VISIBLE_MS;
}

function formatDuration(ms: number): string {
	const seconds = Math.max(1, Math.round(ms / 1000));
	const units = [
		["week", 60 * 60 * 24 * 7],
		["day", 60 * 60 * 24],
		["hour", 60 * 60],
		["minute", 60],
		["second", 1],
	] as const;

	for (const [name, size] of units) {
		const value = Math.floor(seconds / size);
		if (value >= 1) return `${value} ${name}${value === 1 ? "" : "s"}`;
	}

	return "1 second";
}

function clearTimer() {
	if (state.clearTimer) {
		clearTimeout(state.clearTimer);
		state.clearTimer = undefined;
	}
}

export default function (pi: ExtensionAPI) {
	pi.on("agent_start", async (_event, ctx) => {
		clearTimer();
		ctx.ui.setWidget(WIDGET_ID, undefined);
		state.startedAt = Date.now();
	});

	pi.on("agent_end", async (_event, ctx) => {
		const startedAt = state.startedAt;
		state.startedAt = undefined;
		if (!startedAt || !ctx.hasUI) return;

		const text = `Worked for ${formatDuration(Date.now() - startedAt)}`;
		ctx.ui.setWidget(
			WIDGET_ID,
			(_tui, theme) => new Text(theme.fg("muted", text), 0, 0),
			{ placement: "belowEditor" },
		);

		const visibleMs = getVisibleMs();
		if (visibleMs > 0) {
			state.clearTimer = setTimeout(() => {
				ctx.ui.setWidget(WIDGET_ID, undefined);
				state.clearTimer = undefined;
			}, visibleMs);
			state.clearTimer.unref?.();
		}
	});

	pi.on("session_shutdown", async (_event, ctx) => {
		clearTimer();
		ctx.ui.setWidget(WIDGET_ID, undefined);
	});
}
