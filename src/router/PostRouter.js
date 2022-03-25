const router = require('express').Router();
const PostController = require('../controller/postController');
//Hellper
    const verifyToken = require('../helpers/check-user');

router.get('/',PostController.allPost );
router.post('/', verifyToken ,PostController.newPost);
router.delete('/:id',verifyToken ,PostController.deletePost);
router.put('/:id',verifyToken,PostController.updatePost);
router.get('/:id',PostController.getPost)

module.exports = router