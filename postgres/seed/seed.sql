BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT into login (hash, email) values ('$2a$10$VkyCfJlPTpyv5.S6kSsGEOi3btPgf6BVWS88QD6sFqNRzFTWOzMMa', 'jessie@gmail.com');

COMMIT;