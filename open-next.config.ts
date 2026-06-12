import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Marketing site: SSR/SSG with no incremental cache override for now.
// Add `incrementalCache: r2IncrementalCache` here once an R2 bucket is bound
// and we start using ISR/`revalidate`.
export default defineCloudflareConfig();
