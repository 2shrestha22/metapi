import metascraperFactory from 'metascraper';
import metascraperAuthor from 'metascraper-author';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperPublisher from 'metascraper-publisher';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from "metascraper-url";
import metascraperYoutube from 'metascraper-youtube';
const metascraperX = require('metascraper-x');

import { chromium } from 'playwright';
import { resolveShortUrl } from './url_resolver';

const metascraper = metascraperFactory([
  // put platform specific scraper at top
  metascraperYoutube(),
  metascraperX({ resolveUrls: true, resolveUrl: resolveShortUrl }),
  metascraperImage(),
  metascraperTitle(),
  metascraperDescription(),
  metascraperAuthor(),
  metascraperPublisher(),
  metascraperUrl(),
]);

const userAgent = "Googlebot/2.1 (+http://www.google.com/bot.html)";

export async function fetchMetadata(url: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext({ userAgent: userAgent })
  const page = await context.newPage();
  await page.goto(url);
  const content = await page.content();

  await context.close()
  await browser.close()

  const metadata = await metascraper({
    html: content,
    url,
    rules: []
  })

  return metadata;
}