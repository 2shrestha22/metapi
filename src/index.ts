import express from 'express';
import { z } from 'zod';
import { fetchMetadata } from './scraper';

const querySchema = z.object({
  url: z.string().url()
})

const app = express();

app.get('/', async (req, res) => {
  const validation = querySchema.safeParse(req.query);

  if (!validation.success) {
    res.status(400)
      .header({ "Content-Type": "application/json" })
      .json({ error: validation.error });

    return;
  }
  const metadata = await fetchMetadata(validation.data.url);
  res.send(metadata);
});

app.listen(3000);