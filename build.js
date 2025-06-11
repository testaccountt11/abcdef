import { build } from 'esbuild';
import { glob } from 'glob';

async function buildProject() {
  const entryPoints = await glob(['server/**/*.ts', 'shared/**/*.ts']);
  
  try {
    await build({
      entryPoints,
      outdir: 'dist',
      bundle: false,
      platform: 'node',
      format: 'esm',
      target: 'node18',
      sourcemap: true,
    });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject(); 