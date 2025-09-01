import { createClient } from '@supabase/supabase-js'

// Get env values from Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home({ todos }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>✅ Next.js + Supabase Test</h1>
      <p>If you see this page, Next.js is working!</p>

      <h2>Todos from Supabase:</h2>
      <ul>
        {todos?.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>{todo.task}</li>
          ))
        ) : (
          <li>No todos found.</li>
        )}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  let { data: todos } = await supabase.from("todos").select("*")
  return { props: { todos: todos ?? [] } }
}
