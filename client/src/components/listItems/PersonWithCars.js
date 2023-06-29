import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { PERSON_WITH_CARS } from "../../queries";
import Person from "./Person";

const getStyles = () => ({
    router: {
        alignSelf: "flex-start",
        fontSize: "14px",
        marginBottom: "10px",
        textDecoration: "none"
    }
})

const PersonWithCars = () => {
    const styles = getStyles();
    const { id } = useParams();
    const { data } = useQuery(PERSON_WITH_CARS, {
        variables: { id: id }
    });

    // console.log(data);

    const { person } = data;

    console.log(person);

    // const { firstName, lastName, cars } = person;

    // return (
    //     <>
    //         <Link
    //             to={"/"}
    //             style={styles.router}
    //         >
    //             Back to Main
    //         </Link>
    //         <Person
    //             id={id}
    //             firstName={firstName}
    //             lastName={lastName}
    //             cars={cars}
    //         />
    //     </>
    // )
}

export default PersonWithCars;