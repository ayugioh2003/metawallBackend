const corsOptions = {
  origin: [
    'https://metawall-dusky.vercel.app',
    'http://localhost:3000',
  ],
  preflightContinue: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = corsOptions
