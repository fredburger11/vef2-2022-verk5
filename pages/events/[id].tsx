import React from 'react'

function Post({ post }) {
    return (
        <main>
            <div>
                <h1>{post.name}</h1>
                <h2>{post.description}</h2>
                <h2>Skráningar:</h2>
                <ul>
                  {post.registrations?.map((item) =>(
                    <li className='event' key={item.id}>
                      <p className='name'>{item.name}</p> 
                      <p className='com'>{item.comment}</p>
                    </li>
                  ))}
                </ul>
                  
            </div>
        </main>
    )
  }
  
  // This function gets called at build time
  export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/events')
    const posts = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.items.map((post) => ({
      params: { id: JSON.stringify(post.id) },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
  
  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${params.id}`)
    const post = await res.json()
  
    // Pass post data to the page via props
    return { props: { post } }
  }
  
  export default Post