const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.post('/', async (req, res) => {
    // create a new comment
    try {
        console.log(req.session);
        const commentData = await Comment.create(
            {
                description: req.body.description,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            }
        );
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// router.put('/:id', async (req, res) => {
//     Comment.update(
//       {
//         description: req.body.description
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     )
//       .then((updatedComment) => {
//         // Sends the updated book as a json response
//         res.json(updatedComment);
//       })
//       .catch((err) => res.json(err));
// });

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        },
    })
        .then((deletedComment) => {
            res.json(deletedComment);
        })
        .catch((err) => res.json(err));
});

module.exports = router;