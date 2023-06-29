import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import People from "../lists/People";

const Home = () => {
    return (
        <>
            <AddPerson />
            <AddCar />
            <People />
        </>
    )
}

export default Home;