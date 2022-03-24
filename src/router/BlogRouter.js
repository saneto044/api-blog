const router = require('express').Router();
const blogController = require('../controller/blogController');

router.get('/',blogController.allPost );
router.post('/',blogController.newPost);
router.delete('/:id',blogController.deletePost);
router.patch('/:id',blogController.updatePost);

module.exports = router