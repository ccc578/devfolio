/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'rgb(var(--bg) / <alpha-value>)',
        subtle: 'rgb(var(--bg-subtle) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        line: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent2: 'rgb(var(--accent-2) / <alpha-value>)',
        onaccent: 'rgb(var(--on-accent) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
      },
      fontFamily: {
        // 正文与标题共用一套无衬线，靠字重和字距建立层级
        sans: [
          '"Inter var"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI Variable Display"',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
        // 仅文章内引用保留衬线，界面不再使用
        serif: ['"Songti SC"', '"Noto Serif SC"', 'Georgia', 'serif'],
      },
      // 圆角是这套风格的骨架：卡片、按钮、标签都以圆弧收边
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '22px',
        '3xl': '28px',
      },
      // 阴影只做层次提示，不靠投影堆叠
      boxShadow: {
        soft: '0 1px 2px rgb(15 17 23 / 0.04), 0 10px 30px -22px rgb(15 17 23 / 0.35)',
        lift: '0 2px 6px rgb(15 17 23 / 0.05), 0 28px 60px -30px rgb(15 17 23 / 0.35)',
        glow: '0 18px 50px -22px rgb(var(--accent) / 0.55)',
        sm: '0 1px 2px rgb(15 17 23 / 0.05)',
        DEFAULT: '0 1px 2px rgb(15 17 23 / 0.05), 0 8px 24px -18px rgb(15 17 23 / 0.3)',
        md: '0 2px 6px rgb(15 17 23 / 0.06), 0 16px 36px -24px rgb(15 17 23 / 0.3)',
        lg: '0 4px 10px rgb(15 17 23 / 0.06), 0 28px 60px -32px rgb(15 17 23 / 0.35)',
        xl: '0 8px 18px rgb(15 17 23 / 0.07), 0 40px 80px -40px rgb(15 17 23 / 0.4)',
      },
      maxWidth: {
        container: '1200px',
        measure: '68ch',
      },
      letterSpacing: {
        tightest: '-0.04em',
        label: '0.2em',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(100deg, rgb(var(--accent)) 0%, rgb(var(--accent-2)) 100%)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
