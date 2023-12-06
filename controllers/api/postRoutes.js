const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      name: req.body.name,
      description: req.body.description,
      timeframe: req.body.timeframe,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
    console.log("posted");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/posts/:id', async (req, res) => {
  console.log("test put route");
    Post.update(
      {
        description: req.body.description,
        timeframe: req.body.timeframe
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedPost) => {
        // Sends the updated book as a json response
        res.json(updatedPost);
      })
      .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;