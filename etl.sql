-- Question table
\COPY question(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM 'data/questions.csv' DELIMITER ',' CSV HEADER;

-- Answer table
\COPY Answer(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM 'data/answers.csv' DELIMITER ',' CSV HEADER;

-- Answer Image table
\COPY "Answer Image"(id, answer_id, url) FROM 'data/answers_photos.csv' DELIMITER ',' CSV HEADER;