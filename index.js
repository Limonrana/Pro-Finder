/*
 * Project: ProFinder
 * Description: ProFinder project with github API.
 * Author: Limon Rana
 */

//Github API Genarate
let CLIENT_ID = '87037918b55527a404db';
let CLIENT_SECRET = '4e9187b86bba46250afe1e613538ddf6d0d86a63';

/*
 * ====================================================
 * Function: Fetch API Call
 * Description: Github User API call with fetch method.
 * ====================================================
 */

async function getUser(name) {
    const data = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const user = await data.json();
    return user;
}

/*
 * =========================================================
 * Function: Fetch API Call
 * Description: Github User Repos API call with fetch method.
 * =========================================================
 */

async function getRepos(user) {
    const data = await fetch(`${user.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=5`);
    const repos = await data.json();
    return repos;
}


/*
 * =====================================================================
 * Function: Event Listener
 * Description: Event Listener for username search with listener method.
 * =====================================================================
 */
document
    .querySelector('#search')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#findByUsername').value;
        if (name.length > 0) {
            //Loading Function
            showLoading();
            const user = await getUser(name);
            if (user.message === 'Not Found') {
                document.querySelector('.notFound').style.display = 'block';
                document.querySelector('.loader').style.display = 'none';
            } else {
                const repos = await getRepos(user);
                showUser(user);
                showRepos(repos);
                showContent();
            }
        }
    })

/*
 * =====================================================================
 * Function: User Details Show
 * Description: User Deatils Html add on profile div with this function.
 * =====================================================================
 */
function showUser(user) {
    document.querySelector('.profile').innerHTML = `
            <img
                src="${user.avatar_url}"
                alt="letstrie"
                />
                <p class="name">${user.name}</p>
                <p class="username login">${user.login}</p>
                <p class="bio">
                ${user.bio}
                </p>

                <div class="followers-stars">
                <p>
                    <ion-icon name="people-outline"></ion-icon>
                    <span class="followers"> ${user.followers} </span> followers
                </p>
                <span class="dot">·</span>
                <p><span class="following"> ${user.following} </span> following</p>
                </div>

                <p class="company">
                <ion-icon name="business-outline"></ion-icon>
                ${user.company}
                </p>
                <p class="location">
                <ion-icon name="location-outline"></ion-icon>${user.location}
                </p>
                `;
}
/*
 * =====================================================================
 * Function: User Repos Details Show
 * Description: User Repos Deatils Html add on repos div with this function.
 * =====================================================================
 */
function showRepos(repos) {
    let repoHTML = '';
    repos.forEach(repo => {
        repoHTML += `
        <div class="repo">
            <div class="repo_name">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <p>
            <span class="circle"></span> ${repo.language}
            <ion-icon name="star-outline"></ion-icon> ${repo.watchers}
            <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
            </p>
        </div>
        `;
    });
    document.querySelector('.repos').innerHTML = repoHTML;
}

function showLoading() {
    document.querySelector('.notFound').style.display = 'none';
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.user-details').style.display = 'none';
}

function showContent() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.user-details').style.display = 'flex';
}