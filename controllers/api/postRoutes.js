const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
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

router.put('/:id', async (req, res) => {
try {
  const userData = await Post.findOne({
    where: {
      id: req.params.id
    }
  });
  if (userData.dataValues.user_id !== req.session.user_id){
    res.status(404).json({ message: 'User id does not match post' });
  } else if (!userData) {
    res.status(404).json({ message: 'User not found' });
  } else if (userData.dataValues.user_id === userData.dataValues.user_id) {
    const postData = await Post.update(
      {
        name: req.body.name,
        description: req.body.description,
        timeframe: req.body.timeframe
      },
      {
        where: {
          id: req.params.id
        },
      }
    );
    res.json(postData);
  }
} catch(err) {
  console.log(err);
  res.json(err);
}
});

router.delete('/:id', async (req, res) => {
  try {
    const userData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    if (userData.dataValues.user_id !== req.session.user_id) {
      res.status(404).json({ message: 'User id does not match poster id' });
    } else if (!userData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    } else if (userData.dataValues.user_id === req.session.user_id) {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      res.status(200).json(postData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;