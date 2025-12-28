export const BUILD_INFO = {
    gitSha: import.meta.env.VITE_GIT_SHA ?? "dev",
    appVersion: import.meta.env.VITE_APP_VERSION ?? "dev"
}
