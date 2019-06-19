import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
// import Comp from '../components/comp';

import dynamic from 'next/dynamic';

const Comp = dynamic(
  () => import('../components/comp'),
  {
    loading: () => <p>CARGANDO</p>,
    ssr: true
  }
);

const Home = (props) => (
  <div>
      <h1>Hola</h1>
    {props.shows.map(show => <p key={show.id}>{show.name}</p>)}
    <Comp />
  </div>
)

Home.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  return {
    shows: data.map(entry => entry.show)
  }
}

export default Home