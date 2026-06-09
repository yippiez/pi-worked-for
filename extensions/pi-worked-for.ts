import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";

const CUSTOM_TYPE = "pi-worked-for";

type State = {
	startedAt: number | undefined;
};

const state: State = {
	startedAt: undefined,
};

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

function contentText(content: unknown): string {
	if (typeof content === "string") return content;
	if (!Array.isArray(content)) return "";
	return content
		.filter((part): part is { type: "text"; text: string } => part?.type === "text" && typeof part.text === "string")
		.map((part) => part.text)
		.join("\n");
}

export default function (pi: ExtensionAPI) {
	pi.registerMessageRenderer(CUSTOM_TYPE, (message, _options, theme) => {
		return new Text(theme.fg("muted", contentText(message.content)), 0, 0);
	});

	pi.on("agent_start", async () => {
		state.startedAt = Date.now();
	});

	pi.on("agent_end", async () => {
		const startedAt = state.startedAt;
		state.startedAt = undefined;
		if (!startedAt) return;

		pi.sendMessage({
			customType: CUSTOM_TYPE,
			content: `◷ Worked for ${formatDuration(Date.now() - startedAt)}`,
			display: true,
			details: { startedAt: new Date(startedAt).toISOString(), endedAt: new Date().toISOString() },
		});
	});
}
