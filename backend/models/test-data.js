module.exports = (db) => {
    db.user.bulkCreate([
        {
            "name": "Dmitry",
            "login": "Oxy",
            "password": "123456",
        },
        {
            "name": "Ilya",
            "login": "iksent",
            "password": "123456",
        }
    ]).then(() => {
        console.log('TEST DATA > Users inserted')
    }).catch(err => {
        console.log(err);
    })
}