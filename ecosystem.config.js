module.exports = {
    script: 'serve',
    name: 'retailing-frontend',
    // watch: true,
    env: {
      PM2_SERVE_PATH: './build',
      PM2_SERVE_PORT: 9102,
      PM2_SERVE_SPA: 'true',
      // PM2_SERVE_HOMEPAGE: './build/index.html'
    },
  };
  