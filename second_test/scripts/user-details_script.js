const params = new URLSearchParams(window.location.search);
const userId = params.get('id');
const idNameString = document.getElementById('user-id-name');

const textInfoUser = document.getElementById('user-info');
const textInfoAddress = document.getElementById('user-address');
const textInfoCompany = document.getElementById('user-company');

const showPostsButton = document.getElementById('show-posts-button');
const userPostsDiv = document.getElementById('user-posts');

document.getElementById('back-button').onclick = () => {
    history.back();
}

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(userObj => {
        // Заповнення блоків інформацією про user
        idNameString.innerHTML = `ID: ${userObj.id} <br> Name: ${userObj.name}`;

        textInfoUser.innerHTML = `<b> User Name: </b> ${userObj.username} <br> 
                                  <b> Email: </b> ${userObj.email} <br>
                                  <b> Phone number: </b> ${userObj.phone} <br>
                                  <b> Website: </b> ${userObj.website}`;

        textInfoAddress.innerHTML = `<b> City: </b> ${userObj.address.city} <br>
                                     <b> Geo: </b> ${userObj.address.geo.lat}; ${userObj.address.geo.lng} <br>
                                     <b> Street: </b> ${userObj.address.street} <br>
                                     <b> Suite: </b> ${userObj.address.suite} <br>
                                     <b> Zipcode: </b> ${userObj.address.zipcode}`;

        textInfoCompany.innerHTML = `<b> Company name: </b> ${userObj.company.name} <br>
                                     <b> Catch phrase: </b> ${userObj.company.catchPhrase} <br>
                                     <b> bs: </b> ${userObj.company.bs}`;

        // Функція при натисканні кнопки виводу title постів
        showPostsButton.addEventListener('click', (e) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(res => res.json())
                .then(postsArr => {
                    console.log(postsArr);
                    userPostsDiv.innerHTML = '';

                    // Цикл виведення постів з затримкою (для анімації)
                    showPostsCards();
                    async function showPostsCards() {
                        for (const post of postsArr) {
                            const postDiv = document.createElement(`div`);
                            const titlePost = document.createElement(`h3`);
                            const detailsPostButton = document.createElement(`button`);

                            userPostsDiv.appendChild(postDiv);
                            postDiv.appendChild(titlePost);
                            postDiv.appendChild(detailsPostButton);

                            postDiv.classList.add(`post-card`);
                            titlePost.classList.add(`title-post`);
                            detailsPostButton.classList.add(`details-post-button`);

                            titlePost.innerText = `${post.title}`;
                            detailsPostButton.innerText = `Post details`;

                            detailsPostButton.onclick = () => {
                                location.href = `post-details.html?id=${post.id}`;
                            }

                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }
                });
        });
    });



