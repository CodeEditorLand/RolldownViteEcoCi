
setup:
    pnpm install -r
    pnpm --filter './apps/**' --filter "!./apps/qwik-*" run build

test:
    pnpm verify-build
