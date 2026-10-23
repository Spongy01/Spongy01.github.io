---
title: "Hello, world: this site now runs on Astro"
date: 2026-10-22
description: "A first post to try out the blog, covering how the site is built now and how posts work."
tags: ["meta", "astro"]
draft: false
---

This is the first post on the new blog. It is mostly here to make sure everything works: the post list, syntax highlighting, the RSS feed, and the sitemap.

## What changed

The site used to be hand-written HTML, CSS, and a little JavaScript. It is now built with [Astro](https://astro.build), and the output is the same markup as before. The difference is that shared pieces, such as the header and the page shell, live in one place, and posts like this one are plain Markdown files.

Each post starts with a small block of frontmatter:

- **title** and **description**, used on the list page, in the RSS feed, and in the page `<head>`
- **date**, used to sort posts newest first
- **tags**, shown as small labels
- **draft**, which keeps a post out of the build until it is ready

## Code blocks

Code is highlighted at build time, so readers download no extra JavaScript. The colours follow the site's light and dark theme. Here is the schema that validates the frontmatter above:

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

And a bit of Python, since that is most of what I write day to day:

```python
import time


class TokenBucket:
    """Allow `rate` calls per second, with bursts up to `capacity`."""

    def __init__(self, rate: float, capacity: int) -> None:
        self.rate = rate
        self.capacity = capacity
        self.tokens = float(capacity)
        self.updated = time.monotonic()

    def try_acquire(self) -> bool:
        now = time.monotonic()
        self.tokens = min(self.capacity, self.tokens + (now - self.updated) * self.rate)
        self.updated = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
```

> If a typo in the frontmatter, like a missing title, slips in, the build fails with a clear error instead of shipping a broken page.

More soon.
