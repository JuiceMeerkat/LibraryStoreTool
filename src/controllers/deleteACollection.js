import { deleteACollectionByCollectionId, removeAllBooksFromACollection, removeBookFromCollection } from '../model/collections.js'
import { findCollection_idByCollection_nameAnduser_id } from '../model/collections.js'

export const deleteACollection = async (req, res, next) => {
    console.log('deleteACollection FUNC called');
    console.log('req.query.collection_name : ', req.query.collection_name);

    // Get the collection_id relating to this collection_name and this user
    const collection_id = await findCollection_idByCollection_nameAnduser_id(req.user.userid, req.query.collection_name)

    if (collection_id) {


        // const removeBookFromCollectionResponse = await removeBookFromCollection(110, 110);
        // console.log('removeBookFromCollectionResponse : ', removeBookFromCollectionResponse);

        const removeAllBooksFromCollectionResponse = await removeAllBooksFromACollection(collection_id);
        console.log('removeAllBooksFromCollectionResponse : ', removeAllBooksFromCollectionResponse);

        const response = await deleteACollectionByCollectionId(collection_id);
        console.log('response : ', response);



    } else {
        console.log('ERROR: no collection_id was found for the collection_name : ', req.query.collection_name, ' and user_id : ', req.user.userid);
    }



    return res.status(200).json({
        'status': '200',
        'message': 'this is for testing, should not appear otherwise'
    })
}