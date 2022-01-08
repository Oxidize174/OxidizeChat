module.exports = (db) => {
    db.user.bulkCreate([

    ]).then(() => {
        console.log('TEST DATA > Users inserted')
    }).catch(err => {
        console.log(err);
    })
}