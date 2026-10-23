-- Articles storage (Neon Postgres). Safe to run more than once.
CREATE TABLE IF NOT EXISTS articles (
  id          text        PRIMARY KEY,
  topic       text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  ro          jsonb       NOT NULL,
  ru          jsonb       NOT NULL,
  en          jsonb       NOT NULL,
  images      jsonb       NOT NULL DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS articles_created_at_idx ON articles (created_at DESC);
