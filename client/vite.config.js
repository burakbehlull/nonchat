import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import * as path from "path"

function way(name){
  return path.resolve(__dirname, name)
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      '~': way('src'),
      '@pages': way('src/pages/index'),
      '@components': way('src/components/index'),
      '@hooks': way('src/hooks/index'),
      '@helpers': way('src/helpers'),
      '@services': way('src/services/index'),
      '@http': way('src/components/http/index'),
      '@ui': way('src/components/ui/index'),
    }
  },
})
