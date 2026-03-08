const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const postTextInfo = document.getElementById('text-info-post');
const commentsList = document.getElementById('comments-list');

document.getElementById('back-button').onclick = () => {
    history.back();
}

// Виведення інформації про пост
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(postObj => {
        postTextInfo.innerHTML = `<b>ID:</b> ${postObj.id} <br>
                                  <b>Title:</b> ${postObj.title} <br>
                                  <b>Body:</b> ${postObj.body} <br>
                                  <b>User Id:</b> ${postObj.userId}`;
    });

//Виведення коментарів
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(postArr => {

        // Цикл виведення коментарів з затримкою (для анімації)
        showPostsCards();
        async function showPostsCards() {
        for (const postObj of postArr) {

                const commentContainer = document.createElement(`div`);
                const commentBody = document.createElement(`p`);

                commentsList.appendChild(commentContainer);
                commentContainer.appendChild(commentBody);

                commentContainer.classList.add(`comment-container`);

                commentBody.innerText = postObj.body;

                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
});