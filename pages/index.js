import Head from 'next/head'


export default function Index() {
  return (
    <div className="home">
      <header className="header">
        <a href="/home">Home</a>
        <a href="/search">Search</a>
      </header>
    </div>
  )
}
