import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { PERSON_WITH_CARS } from "../../queries";
import Person from "./Person";
import { useEffect, useState } from "react";

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

    const [p, setP] = useState(null);

    // console.log(data.person);

    useEffect(() => {
        if (data && data.person !== null) {
            const person = data.person;
            // console.log(person);
            setP(person);
        }
    }, [data]);

    // const p = data.person;

    console.log(p);

    if (!p) {
        return <p>Loading...</p>
    }

    const { firstName, lastName, cars } = p;

    return (
        <>
            <Link
                to={"/"}
                style={styles.router}
            >
                Back to Main
            </Link>
            <Person
                id={id}
                firstName={firstName}
                lastName={lastName}
                cars={cars}
            />
        </>
    )
}

export default PersonWithCars;