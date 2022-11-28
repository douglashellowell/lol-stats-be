import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.send({ msg: 'hello there' });
});

export default app;
