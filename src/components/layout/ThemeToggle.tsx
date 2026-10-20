import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '切换到亮色主题' : '切换到暗色主题'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
    >
      {isDark ? (
        <Sun className="h-[17px] w-[17px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[17px] w-[17px]" aria-hidden="true" />
      )}
    </button>
  );
}
