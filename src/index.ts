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

  try {
    const metadata = await fetchMetadata(validation.data.url);
    res.send(metadata);
  } catch (error) {
    res.status(400)
      .header({ "Content-Type": "application/json" })
      .json({ error: `Failed to load ${validation.data.url}.` });
  }

});

app.listen(3000);