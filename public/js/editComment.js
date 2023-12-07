let editButtonClick = document.querySelector('.btn-com-save');


const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('id')) {
      const id = event.target.getAttribute('id');
      
      const description = document.querySelector('#com-desc-input').value.trim();
      
      if ( description ) {
        const response = await fetch(`/api/comments/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to edit comment');
        }
      }
    }
  };


  
editButtonClick.addEventListener('click', editButtonHandler);