db.createUser({
  user: "social",
  pwd: "social",
  roles: [
    {
      role: "readWrite",
      db: "social_network",
    },
  ],
});
db.createCollection("test");
