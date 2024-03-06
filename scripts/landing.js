const instructions = document.querySelector(`#instructionsButton`)

function buttonHandler(event) {
    event.preventDefault();

    alert("Welcome to What The GIF?! Your goal is to come up with the funniest caption for a series of GIFs. Submit your captions, vote on your favorites, and may the wittiest player win!")
}

instructions.addEventListener(`click`, buttonHandler)