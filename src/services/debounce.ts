type Timer = ReturnType<typeof setTimeout>;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: null | Timer = null;

  return function debounced(this: any, ...args: Parameters<T>) {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);

    return function reset() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  };
}
