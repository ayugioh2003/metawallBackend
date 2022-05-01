const corsOptions = {
  origin: '*',
  preflightContinue: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = corsOptions
