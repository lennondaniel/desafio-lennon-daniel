set -e

mongosh <<EOF

db = db.getSiblingDB('desafio-lennon')

db.createUser({
  user: 'mongo_user',
  pwd: 'secret',
  roles: [
    {
      role: 'dbOwner',
      db: 'desafio-lennon',
    },
  ],
})

EOF