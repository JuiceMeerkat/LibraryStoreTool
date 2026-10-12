export const renderFindBookPage = (req, res, next) => {
    console.log('router.get "/" called');

    const options = {
        'user': res.locals.user
    }
    return res.render('pages/findBookPage.ejs', options)
}