import pool from '../config/db.js';


export const getCollections = async (req, res, next) => {
    console.log('FUNC getCollections called')
    console.log('req.user : ', req.user);

    const user_id = req.user.userid
    console.log('user_id : ', user_id);

    const result = await pool.query(`
        SELECT *
        FROM collections
        WHERE user_id = $1`, [user_id]) // Query values must be an array (that's why user_id is in square brackets)
    

    const rows = result.rows;

    console.log('result : ', result);
    console.log('rows : ', rows);

    return res.status(200).json({
        'status' : 200,
        'rows' : rows
    })
}


export const postCollection = async (req, res, next) => {    
    console.log('FUNC postCollections called')
    

    console.log('req.user : ', req.user);
    console.log('req.body.collection : ', req.body.collection);

    const collection_name = req.body.collection;

    const user_id = req.user.userid

    // This checks whether a collection with that name already exists for that user.
    const result = await pool.query(`
        SELECT *
        FROM collections
        WHERE (collection_name = $1) and (user_id = $2)`, [collection_name, user_id]
    ) // Query values must be an array (that's why user_id is in square brackets)

    const rows = result.rows;

    console.log('result : ', result);
    console.log('rows : ', rows);

    if (rows.length > 0) {
        console.log('User already has a collection with that name')
        // Throw a tantrum
        return res.status(409).json({
            'status': 409,
            'message': 'error occured',
            'error': 'A collection with that name already exists for this user'
        })
    } else {
        if (!collection_name.length == 0) {
            // Create a row in the collections table including
            const response = await pool.query(`
                INSERT INTO collections (user_id, collection_name)
                VALUES ($1, $2)`, [user_id, collection_name]);

            // const result = response.rows;
            console.log('response : ', response);
        } else {
            console.log('!(!collection_name.length == 0)')
            return res.status(500).json({
                'status': 500,
                'message': 'There was an error on the server end (I think - I cnbb searching up what status code)',
                'What went wrong': 'You cannot make a collection with a name of 0 length',
                'collection_name': collection_name
            })
        }
    }

    return res.status(200).json({
        'status' : 200,
        'req.body.collection': req.body.collection
        // 'rows' : rows
    })
}

export const addBookToCollectionModel = async (book_id, collection_id) => {
    console.log('addBookToCollectionModel FUNC called');
    console.log('args given: ...');
    console.log('   book_id : ', book_id);
    console.log('   collection_id : ', collection_id);

    const response = await pool.query(`
        INSERT INTO j_books_collections (book_id, collection_id)
        VALUES ($1, $2)`, [book_id, collection_id])
    
    // const result = response.json()
    console.log('response: ', response);
    return response;
}

export const getBook_idsInACollectionByCollection_id = async (collection_id) => {
    console.log('getBook_idsInACollectionByCollection_id FUNC called');
    console.log('args passed:');
    console.log('   collection_id : ', collection_id);

    const response = await pool.query(`
        SELECT book_id
        FROM j_books_collections
        WHERE collection_id = $1
        ORDER BY created_at DESC;`, [collection_id]);

    // console.log('response : ', response);
    
    const result = response.rows;
    console.log('result : ', result);

    const book_idsArrOfObjs = result;
    return book_idsArrOfObjs;
}

export const findCollection_idByCollection_nameAnduser_id = async (user_id, collectionName) => {
    console.log('findCollection_idByCollection_nameAnduser_id FUNC called');

    console.log('args passed: ...');
    console.log('   user_id : ', user_id);
    console.log('   collectionName : ', collectionName);

    const response = await pool.query(`
        SELECT collection_id
        FROM collections
        WHERE user_id = $1 and collection_name = $2`, [user_id, collectionName])
    
    console.log('response : ', response);

    // const result = response.rows[0].collection_id;
    // console.log('result : ', result);
    
    if (response.rows[0] && response.rows[0].collection_id) {
        console.log('if (result)');
        return response.rows[0].collection_id
    } else {
        console.log('else');
        return false
    }
}

export const deleteACollectionByCollectionId = async (collection_id) => {
    console.log('deleteACollectionByCollectionId FUNC called');
    // collection_id = 110;
    const response = await pool.query(`
        DELETE FROM collections
        WHERE collection_id = $1`, [collection_id]);
    
    return response;
}

export const removeBookFromCollection = async (book_id, collection_id) => {
    console.log('removeBookFromCollection FUNC called');
    const response = await pool.query(`
        DELETE FROM j_books_collections
        WHERE book_id = $1 and collection_id = $2`, [book_id, collection_id]);
    
    // console.log('response : ', response);

    return response;
}


export const removeAllBooksFromACollection = async(collection_id) => {
    console.log('removeAllBooksFromACollection FUNC called');
    const response = await pool.query(`
        DELETE FROM j_books_collections
        WHERE collection_id = $1`, [collection_id]);
    
    return response;
}

export const updateACollection_nameModelByCollection_id = async (newCollection_name, collection_id) => {
    console.log('updateACollectionNameModel FUNC called');

    const response = await pool.query(`
        UPDATE collections
        SET collection_name = $1
        WHERE collection_id = $2`, [newCollection_name, collection_id]);
    
    return response;
}