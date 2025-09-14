// esbuild.config.js
const nodeBuiltIns = [
    'util',
    'path',
    'fs',
    'stream',
    'zlib',
    'os',
    'http',
    'https',
    'crypto',
];

module.exports = {
    entryPoints: ['./src/handler/handler.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs', // ⬅️ Key: Use CJS to avoid ESM dynamic require issues
    target: 'node22',
    sourcemap: false,
    minify: true,
    concurrency: 10,
    package: 'external',
    outdir: '.serverless/build',
    external: ['aws-sdk', ...nodeBuiltIns], // ⬅️ Externalize built-in modules
    define: {
        'require.resolve': 'undefined',
    },
};