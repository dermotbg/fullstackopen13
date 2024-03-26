-- excersie 13.2
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) values (
  'Michael Chan', 
  'https://reactpatterns.com/', 
  'React patterns'
);
INSERT INTO blogs (author, url, title) values (
  'Robert C. Martin', 
  'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
  'Type wars'
);
