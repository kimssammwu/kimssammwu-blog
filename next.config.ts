import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
 
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}
 
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: {
          light: "catppuccin-latte",
          dark: "material-theme-darker",
    },
    grid: false
  }]],
  },
})
 
export default withMDX(nextConfig)