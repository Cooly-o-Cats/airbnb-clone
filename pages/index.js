import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences</title>
        <link rel="icon" href="https://cdn.icon-icons.com/icons2/836/PNG/512/Airbnb_icon-icons.com_66791.png" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-6">Explore Nearby</h2>

          {/* Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData?.map(item => (
            <SmallCard
              key={item.img}
              location={item.location}
              img={item.img}
              distance={item.distance}
            />
          ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard 
                key={img}
                title={title}
                img={img}/>
            ))}
          </div>
        </section>

        <LargeCard 
        img="https://links.papareact.com/4cj"
        title="The Greatest Outdoors"
        description="Wishlists curated by Airbnb"
        btnText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/4G1G').
    then(
      (res) => res.json()
    );

  const cardsData = await fetch('https://jsonkeeper.com/b/VHHT').
    then(
      (res) => res.json()
    );

  return {
    props: {
      exploreData, cardsData
    }
  }
}
