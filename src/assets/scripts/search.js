(async () => {
    document.getElementById('search').addEventListener('keyup', (event) => {
      const searchString = event.target.value.toLowerCase()
      const results = []
      posts.forEach((post) => {
        if (
          post.title.toLowerCase().includes(searchString) ||
          post.excerpt.toLowerCase().includes(searchString) ||
          post.tags.toLowerCase().includes(searchString)
        ) {
          results.push(`
            <li>
                <a href="${post.url}">
                    ${post.title}
                </a> - ${post.date}
                <br />
                ${post.excerpt}
            </li>
            `)
        }
      })
  
      document.getElementById('results').innerHTML = results.join('')
    })
  
    const posts = await fetch('/search.json').then(res => res.json())
  })()