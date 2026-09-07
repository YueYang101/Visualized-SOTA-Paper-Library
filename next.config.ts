import type { NextConfig } from 'next';

const githubPagesAssetPrefix = process.env.GITHUB_PAGES_ASSET_PREFIX ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: githubPagesAssetPrefix,
};

export default nextConfig;
