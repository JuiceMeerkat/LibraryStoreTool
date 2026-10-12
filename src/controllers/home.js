
export const renderHomepage = (req, res, next) => {
    console.log('FUNC: renderHomepage **');

    console.log('res.locals.user : ', res.locals.user);

    // Here we are calling on the VIEW
    res.render("pages/homepage.ejs", {
        'user': res.locals.user
    })
}