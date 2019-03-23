const localServerAddress = 'http://localhost:3001'
const headers = {
    'Authorization': Math.random() * 1000,
    'Content-Type': 'application/json'
}

export async function getInitialData() {
    const endpoints = [
        'categories',
        'posts'
    ]
    const promisesArray = endpoints.map(async (endpoint) => {
        return (await fetch(`${localServerAddress}/${endpoint}`,{
            headers: headers
        })).json()
    })

    return Promise.all(promisesArray)
        .then((responses) => {
            return {
                categories: responses[0].categories,
                posts: responses[1]
            }
        })
}

export async function saveVoteOnPost(id, option) {
    return (await fetch(`${localServerAddress}/posts/${id}`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({id, option})
    })).json()
}