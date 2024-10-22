export const postJoke = async (jokePost) => {
        const response = await fetch("http://localhost:8088/jokes", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jokePost)
        });
        
        const result = await response.json();
        return result;
}