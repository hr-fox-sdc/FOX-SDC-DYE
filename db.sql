DROP TABLE IF EXISTS Question cascade;

CREATE TABLE Question (
  id SERIAL,
  product_id INTEGER NOT NULL DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written CHAR(60) NOT NULL,
  asker_name CHAR(60) NOT NULL,
  asker_email CHAR(60) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

COPY question(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/andrewdye/Senior_Hackreactor/SDC/FOX-SDC-DYE/data/questions.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS Answer cascade;

CREATE TABLE Answer (
  id SERIAL,
  question_id INTEGER NOT NULL DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written CHAR(60) NOT NULL,
  answerer_name CHAR(60) NOT NULL,
  answerer_email CHAR(60) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

COPY Answer(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/andrewdye/Senior_Hackreactor/SDC/FOX-SDC-DYE/data/answers.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS "Answer Image" cascade;

CREATE TABLE "Answer Image" (
  id SERIAL,
  answer_id INTEGER NOT NULL DEFAULT NULL,
  url CHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

COPY "Answer Image"(id, answer_id, url) FROM '/Users/andrewdye/Senior_Hackreactor/SDC/FOX-SDC-DYE/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE Answer ADD FOREIGN KEY (question_id) REFERENCES Question (id);
ALTER TABLE "Answer Image" ADD FOREIGN KEY (answer_id) REFERENCES Answer (id);