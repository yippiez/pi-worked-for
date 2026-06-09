import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";

const WIDGET_ID = "pi-worked-for";
const VERBS = [
	"Sautéed",
	"Churned",
	"Simmered",
	"Braised",
	"Whisked",
	"Kneaded",
	"Baked",
	"Toiled",
	"Schemed",
	"Cogitated",
	"Ruminated",
	"Pondered",
	"Conjured",
	"Brewed",
	"Steeped",
	"Marinated",
	"Roasted",
	"Smelted",
	"Forged",
	"Tinkered",
	"Milled",
	"Distilled",
	"Fermented",
	"Pickled",
	"Reduced",
	"Caramelized",
	"Proofed",
	"Griddled",
	"Poached",
	"Blanched",
	"Julienned",
	"Zested",
	"Tempered",
	"Percolated",
	"Infused",
	"Decanted",
	"Hummed",
] as const;

type State = {
	startedAt: number | undefined;
};

const state: State = {
	startedAt: undefined,
};

function randomVerb(): string {
	return VERBS[Math.floor(Math.random() * VERBS.length)] ?? "Worked";
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

export default function (pi: ExtensionAPI) {
	pi.on("input", async (_event, ctx) => {
		ctx.ui.setWidget(WIDGET_ID, undefined);
		return { action: "continue" };
	});

	pi.on("session_before_compact", async (_event, ctx) => {
		ctx.ui.setWidget(WIDGET_ID, undefined);
	});

	pi.on("session_compact", async (_event, ctx) => {
		ctx.ui.setWidget(WIDGET_ID, undefined);
	});

	pi.on("agent_start", async (_event, ctx) => {
		ctx.ui.setWidget(WIDGET_ID, undefined);
		state.startedAt = Date.now();
	});

	pi.on("agent_end", async (_event, ctx) => {
		const startedAt = state.startedAt;
		state.startedAt = undefined;
		if (!startedAt || !ctx.hasUI) return;

		const text = ` ${randomVerb()} for ${formatDuration(Date.now() - startedAt)}\n`;
		ctx.ui.setWidget(WIDGET_ID, (_tui, theme) => new Text(theme.fg("muted", text), 0, 0));
	});

	pi.on("session_shutdown", async (_event, ctx) => {
		ctx.ui.setWidget(WIDGET_ID, undefined);
	});
}
