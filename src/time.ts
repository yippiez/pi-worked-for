/**Time and duration formatting utilities. */


// ========================================
// Duration Formatting


/** Format a duration in milliseconds as a compact string (e.g. "5m30s", "2h15m").

    Args:
        ms: Duration in milliseconds. Negative values are clamped to 0.

    Returns:
        A compact human-readable duration string.

    Example:
        >>> TimeFormatDuration(330_000)
        "5m30s"
 */
export function TimeFormatDuration(ms: number): string {
	// Convert to whole seconds, clamping negatives
	const s = Math.max(0, Math.floor(ms / 1000));

	if (s < 60) {
		return `${s}s`;
	}

	const m = Math.floor(s / 60);
	const rs = s % 60;

	if (m < 60) {
		return `${m}m${rs}s`;
	}

	const h = Math.floor(m / 60);
	return `${h}h${m % 60}m`;
}


// ========================================
// Interval Formatting




// ========================================
// Interval Parsing




// ========================================
// Token Parsing




// ========================================
// Token Formatting
