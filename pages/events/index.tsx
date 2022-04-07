import React from 'react'
import Link from 'next/link'

function Events({ posts }) {
  return (
    <main>
      <div>
        
          <h1>Viðburðir á næstunni</h1>
          <h2>Viðburðir á næstunni</h2>
          <ul>

          
          {posts.items.map((item) => (
            <li className='events' key={item.id}>
              <Link href={`/events/${encodeURIComponent(item.id)}`}>{item.name}</Link>
              <p>{item.description}</p>
          </li>
          ))}
        </ul>
      </div>
      
    </main>
    
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/events')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Events