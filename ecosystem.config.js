module.exports = {
  apps : [{
    name: 'fantasy-boi',
    script: 'dist/fantasy-boi.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'fantasy-boi',
      host : 'localhost',
      ref  : 'origin/master',
      repo : 'git@github.com:ryanpage42/fantasy-boi.git',
      path : '/var/opt/production/fantasy-boi',
      'post-deploy' : 'npm install && tsc && pm2 reload ecosystem.config.js --env production'
    }
  }
};
