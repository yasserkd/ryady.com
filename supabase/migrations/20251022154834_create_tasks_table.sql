/*
  # Create Tasks Table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key) - Unique identifier for each task
      - `title` (text) - Task title
      - `completed` (boolean) - Task completion status, defaults to false
      - `created_at` (timestamptz) - Timestamp when task was created
      
  2. Security
    - Enable RLS on `tasks` table
    - Add policy for public users to read all tasks
    - Add policy for public users to insert new tasks
    - Add policy for public users to update tasks
    - Add policy for public users to delete tasks
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tasks"
  ON tasks
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tasks"
  ON tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tasks"
  ON tasks
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete tasks"
  ON tasks
  FOR DELETE
  USING (true);