import { format } from "date-fns";
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard";

function search({ searchResults }) {

    const router = useRouter();
    const location = router.query.location;
    const startDate = router.query.startDate;
    const endDate = router.query.endDate;
    const noOfGuests = router.query.noOfGuests

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;


    return (
        <div>
            <Head>
                <title>Search of Rentals in {location}</title>
            </Head>

            <Header placeholder={`${location} | ${range} | ${noOfGuests}`}/>

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuests} number of guests</p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
            
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <button className="px-4 py-2 border rounded-full cursor-pointer transition hover:shadow-lg active:scale-95 active:bg-gray-100 duration-100 ease-out">Cancellation Flexibility</button>
                        <button className="filter-button"> Type of Room</button>
                        <button className="filter-button">Price</button>
                        <button className="filter-button">Rooms and Beds</button>
                        <button className="filter-button">More Filters</button>
                    </div>

                    <div className="flex flex-col">
                    {searchResults.map(({ img, location, title, description, star, price, total }) => (
                        <InfoCard 
                            key={img}
                            img={img} 
                            location={location} 
                            title={title} 
                            description={description} 
                            star={star} 
                            price={price}
                            total={total}
                        />
                    ))}
                    </div>
                    

                </section>
            </main>

            <Footer/>
        </div>
    )
}

export default search

export async function getServerSideProps() {
    const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then(res => res.json());

    return {
        props: {
            searchResults,
        }
    }
}
