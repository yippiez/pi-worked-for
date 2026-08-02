/** Shared contracts for outline line rendering. */
import type { ThemeColor } from "@earendil-works/pi-coding-agent";


// ========================================
// Theme

/** Minimal theme surface shared by outline line renderers. */
export interface RenderTheme {
	fg(color: ThemeColor, text: string): string;
	bold(text: string): string;
}


/** Options for multiline code block chip rendering. */
export interface OutlineCodeRenderOptions {
	/** Mention ⌥E in the chip (live outline editor only). */
	showExpandHint?: boolean;
	/** Panel background for the graph prefix (live outline editor). */
	panelBg?: string;
	/** Highlight the chip when the cursor is on this row. */
	caretActive?: boolean;
	/** Background used for the chip when caretActive (defaults to code bg). */
	caretBg?: string;
}
