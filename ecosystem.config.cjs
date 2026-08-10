module.exports = {
  apps: [
    {
      name: "flowledger-landing",
      cwd: "/Users/razs/production/flowledger_landing",
      script: "npm",
      args: "run preview -- --host 127.0.0.1 --port 5181",
      interpreter: "none",
      autorestart: true,
      watch: false
    },
    {
      name: "flowledger-gateway",
      cwd: "/Users/razs/production/flowledger_landing",
      script: "server/gateway.js",
      autorestart: true,
      watch: false
    }
  ]
};
