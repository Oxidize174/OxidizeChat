module.exports = (db) => {
    db.user.bulkCreate([
        {
            "name": "Dmitry",
            "login": "Oxydize",
            "password": "123456",
        },
        {
            "name": "Ilya",
            "login": "Iksent",
            "password": "123456",
        },
        {
            "name": "Anton",
            "login": "New",
            "password": "123456",
        }
    ]).then(() => {
        console.log('TEST DATA > Users inserted')
    }).catch(err => {
        console.log(err);
    })
}