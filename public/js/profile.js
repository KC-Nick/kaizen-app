const newPostHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#goal-name').value.trim();
  const description = document.querySelector('#goal-desc').value.trim();
  const timeframe = document.querySelector('#timeframe').value.trim();

  if (name && description && timeframe) {
    console.log("posting")
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, description, timeframe }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    
    // Show an alert to confirm the deletion
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    
    if (confirmDelete) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post');
      }
    }
  }
};

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    
    const description = document.querySelector('#desc-input').value.trim();
    const timeframe = document.querySelector('#timeframe-input').value.trim();
    const post_id = window.location.pathname.split("/")[2]
    
    if (description && timeframe && post_id) {
      const response = await fetch(`/api/posts/`, {
        method: 'PUT',
        body: JSON.stringify({ description, timeframe, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log("profile js")
        res.redirect(`/api/posts/${post_id}`);
      } else {
        alert('Failed to edit post');
      }
    }
  }
};

document
  .querySelector('.new-goal-form')
  .addEventListener('submit', newPostHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.btn-edit')
  .addEventListener('click', editButtonHandler);