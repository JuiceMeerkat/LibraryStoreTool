export const serveRegisterPage = (req, res, next) => {
    console.log('FUNC: register (but GET)**')

    const options = {
        'user': res.locals.user
    }

    return res.render('pages/registerPage.ejs', options)
}

export const serveLoginPage = (req, res, next) => {
    console.log('FUNC: login (but GET)**')

    const options = {
        'user': res.locals.user
    }
    return res.render('pages/loginPage.ejs', options);
}

export const signout = (req, res, next) => {
    res.clearCookie('token');
    return res.redirect('/')
}