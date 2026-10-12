export const renderYourCollectionsPage = (req, res, next) => {
    
    const options = {
        'user': res.locals.user
    }
    
    res.render('pages/yourCollectionsPage.ejs', options)
}

