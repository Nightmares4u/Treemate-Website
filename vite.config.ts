import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * In production Vercel serves `api/contact.ts` as a serverless function. The
 * Vite dev server knows nothing about `api/`, so mount the very same module as
 * middleware — dev and production then exercise identical code.
 */
function contactApiDevServer(): Plugin {
  return {
    name: 'treemate:contact-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        try {
          const mod = await server.ssrLoadModule('/api/contact.ts')
          const handler = mod.default as (req: unknown, res: unknown) => Promise<void>
          await handler(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Server-only secrets. Loaded without the VITE_ prefix so they are never
  // inlined into the client bundle; api/contact.ts reads them off process.env.
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['GOOGLE_APPS_SCRIPT_URL', 'FORM_API_SECRET']) {
    if (env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [react(), contactApiDevServer()],
  }
})
