export const postJoke = async (jokePost) => {
    const response = await fetch("http://localhost:8088/jokes", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jokePost)
    });
        
    const result = await response.json();
    return result;
}

export const getAllJokes = async () => {
    const response = await fetch ("http://localhost:8088/jokes")
    const jokes = await response.json()
    return jokes
}

export const changeTold = async (id, text, told) => {
    const response = await fetch(`http://localhost:8088/jokes/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "id": id,
            "told": told,
            "text": text
        })
    });
    
    const result = await response.json()
    return result
}

export const deleteJoke = async (jokeId) => {
    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}})
}