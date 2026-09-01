const INTERACTIVE_ELEMENT_SELECTOR =
  "button, a, input, select, textarea, summary, [role='button'], [role='link'], [contenteditable='true']";

export function isInteractiveElement(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(INTERACTIVE_ELEMENT_SELECTOR));
}
