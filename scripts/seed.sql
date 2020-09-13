USE DATABASE bookclub;

INSERT INTO readers(userName, email, password, createdAt, updatedAt) VALUES ("user1", "email1@mail.com", "1234", NOW(), NOW());
INSERT INTO reader(userName, email, password, createdAt, updatedAt) VALUES ("user2", "email2@mail.com", "1234", NOW(), NOW());
INSERT INTO readers(userName, email, password, createdAt, updatedAt) VALUES ("user3", "email3@mail.com", "1234", NOW(), NOW());
INSERT INTO readers(userName, email, password, createdAt, updatedAt) VALUES ("user4", "email4@mail.com", "1234", NOW(), NOW());

INSERT INTO books(id, title, author, synopsis, createdAt, updatedAt, ReaderId) VALUES (1, "Fake Title1", "Fake Author1", "These are some words1", NOW(), NOW(), 1);
INSERT INTO books(id, title, author, synopsis, createdAt, updatedAt, ReaderId) VALUES (2, "Fake Title2", "Fake Author2", "These are some words2", NOW(), NOW(), 2);
INSERT INTO books(id, title, author, synopsis, createdAt, updatedAt, ReaderId) VALUES (3, "Fake Title3", "Fake Author3", "These are some words3", NOW(), NOW(), 1);
INSERT INTO books(id, title, author, synopsis, createdAt, updatedAt, ReaderId) VALUES (4, "Fake Title1", "Fake Author1", "These are some words1", NOW(), NOW(), 1);
