
const categories = [
    {
        name: 'organs',
        words: ['brain', 'liver', 'lungs', 'heart', 'stomach'],
    },
    {
        name: 'sports',
        words: ['soccer', 'basketball', 'tennis', 'hockey', 'baseball'],
    },
    {
        name: 'music',
        words: ['rock', 'jazz', 'country', 'dance', 'house'],
    }
]

function randomWord() {
    const randomCatKey = Math.floor(Math.random() * categories.length)
    const randomCategory = categories[randomCatKey]

    const name = randomCategory.name
    const word = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)]

    return {
        category: name,
        word
    }
}

export default randomWord;