const category_list = [
    'Animals',
    'Anime',
    'Blockchain',
    'Books',
    'Business',
    'Calendar',
    'Weather',
    'Transportation',
    'Health',
    'Jobs',
    'Music',
]

const fetchData = async (category, limit) => {
    const data = await fetch('https://api.publicapis.org/entries')
        .then(res => res.json())
        .then(
            (result) => {
                // console.log("API RESULT:", result)
                return result
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('Something went wrong... Please try again.')
            }
        )

    const entries = data.entries
    if (entries) {
        const filtered = entries.filter((item, idx) => item.Category === category)
        const limited = filtered.slice(0, limit)
        console.log(limited)
    } else {
        console.log('No results')
    }
}

const category = process.argv[2]
const limit = process.argv[3]
if (!category || !limit) {
    console.log('Please input category and limit!')
} else {
    if (!category_list.includes(category)) {
        console.log(`No results`);
        return;
    }
    if (isNaN(limit) || limit <= 0) {
        console.log('Limit should be a number greater than 0');
        return
    }

    console.log(`Fetching ${limit} ${limit > 1 ? 'records' : 'record'} of ${category}...`)
    console.log()

    fetchData(category, limit)
}