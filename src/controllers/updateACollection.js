import { updateACollection_nameModelByCollection_id } from "../model/collections.js";
import { findCollection_idByCollection_nameAnduser_id } from "../model/collections.js";

export const updateACollectionName = async(req, res, next) => {
    console.log('updateACollectionName FUNC (controller) called');
    console.log('req.body.collection_name : ', req.body.collection_name);
    console.log('req.body.newCollection_name : ', req.body.newCollection_name)

    // findCollection_idByCollection_nameAnduser_id
    const collection_id = await findCollection_idByCollection_nameAnduser_id(req.user.userid, req.body.collection_name);
    console.log('collection_id : ', collection_id);

    const response = await updateACollection_nameModelByCollection_id(req.body.newCollection_name, collection_id);

    return res.status(200).json({
        'status': '200',
        'message': 'For testing purposes, you get a 200',
        'response': response
    })
}