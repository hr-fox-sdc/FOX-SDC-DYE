-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Question'
--
-- ---

DROP TABLE IF EXISTS Question cascade;

CREATE TABLE Question (
  id SERIAL,
  product_id INTEGER NOT NULL DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name CHAR(60) NOT NULL,
  asker_email CHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- --- id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- Table 'Answer'
--
-- ---

DROP TABLE IF EXISTS Answer cascade;

CREATE TABLE Answer (
  id SERIAL,
  question_id INTEGER NOT NULL DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name CHAR(60) NOT NULL,
  answerer_email CHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
-- Table 'Answer Image'
--
-- ---

DROP TABLE IF EXISTS Answer_Image cascade;

CREATE TABLE Answer_Image (
  id SERIAL,
  answer_id INTEGER NOT NULL DEFAULT NULL,
  url CHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

-- ---id,answer_id,url
-- Foreign Keys
-- ---

ALTER TABLE Answer ADD FOREIGN KEY (question_id) REFERENCES Question (id);
ALTER TABLE Answer_Image ADD FOREIGN KEY (answer_id) REFERENCES Answer (id);

SELECT setval('question_id_seq', COALESCE((SELECT MAX(id)+1 FROM question), 1), false);
SELECT setval('answer_id_seq', COALESCE((SELECT MAX(id)+1 FROM answer), 1), false);
SELECT setval('answer_image_id_seq', COALESCE((SELECT MAX(id)+1 FROM answer_image), 1), false);
-- ---
-- Table Properties
-- ---

-- ALTER TABLE Product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Question ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answer ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answer Image ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Product (product_id,results) VALUES
-- ('','');
-- INSERT INTO Question (question_id,question_body,question_date,asker_name,question_helpfulness,reported,product_id_Products) VALUES
-- ('','','','','','','');
-- INSERT INTO Answer (answer_id,body,date,answerer_name,helpfulness,question_id_Questions) VALUES
-- ('','','','','','');
-- INSERT INTO Answer Image (id,url,answer_id_Answers) VALUES
-- ('','','');