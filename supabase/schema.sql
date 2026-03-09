-- Create Categories Table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  translations jsonb NOT NULL -- Example: {"en": {"name": "AI", "description": "..."}, "fi": {"name": "Tekoäly", "description": "..."}}
);

-- Create Posts Table
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  cover_image text,
  author text NOT NULL,
  published_at timestamp with time zone DEFAULT now(),
  reading_time smallint NOT NULL,
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  translations jsonb NOT NULL -- Example: {"en": {"title": "...", "excerpt": "...", "content": ["..."]}, "fi": {...}}
);

-- Create simple RLS policies (allow anyone to read)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on posts"
  ON posts FOR SELECT
  USING (true);

-- Allow authenticated admin to do everything
CREATE POLICY "Allow admin full access on categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on posts"
  ON posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
