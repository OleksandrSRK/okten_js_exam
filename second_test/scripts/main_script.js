const containerOfUsers = document.getElementById('users-list-container');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(usersArray =>{
        // Створення блоків user
        for (const user of usersArray){
            const userContainer = document.createElement('div');
            const infoOfUser = document.createElement('p');
            const infoButton = document.createElement('button');

            userContainer.classList.add('card');
            infoOfUser.classList.add('information-of-user');
            infoButton.classList.add('info-button');

            containerOfUsers.appendChild(userContainer);
            userContainer.appendChild(infoOfUser);
            userContainer.appendChild(infoButton);

            // Заповнення блоків
            infoOfUser.innerHTML = `<b>${user.id}</b> ${user.name}`;
            infoButton.innerText = `All information`;
            infoButton.onclick = () => {
                location.href = `user-details.html?id=${user.id}`
            }
        }
    });
