export const accountController = (req, res, next) => {
    console.log('FUNC: register (but POST)**')
    console.log('req.user : ', req.user)

    const options = {
        'name': req.user.username,
        'email': req.user.email,
        'user': res.locals.user
    }
    return res.render('pages/accountPage.ejs', options)
}