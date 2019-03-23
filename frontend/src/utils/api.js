export async function getInitialData() {
    const localServerAddress = 'http://localhost:3001'
    const endpoints = [
        'categories',
        'posts'
    ]
    const headers = {
        'Authorization': Math.random() * 1000
    }

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