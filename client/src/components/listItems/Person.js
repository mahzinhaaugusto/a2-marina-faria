import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import { GET_CARS } from "../../queries";
import Car from "./Car";
import { useQuery } from "@apollo/client";
import UpdateCar from "../forms/UpdateCar";
import { Link } from "react-router-dom";

const getStyles = () => ({
    card: {
        width: "1000px"
    }
})

const Person = props => {

    const { id, firstName, lastName, carId, year, make, model, price, personId } = props;
    const styles = getStyles();
    const [edit, setEdit] = useState(false);
    const { data: carsData } = useQuery(GET_CARS);
    const [editCar, setEditCar] = useState(false);

    const handleBtnClicked = () => {
        setEdit(!edit);
    }

    const handleCarBtnClicked = () => {
        setEditCar(!editCar);
    }

    const personCars = carsData?.cars.filter((car) => car.personId === id);

    return (
        <div>
            {edit ?
                (<UpdatePerson
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    onBtnClicked={handleBtnClicked}
                />)
                :
                (<Card
                    style={styles.card}
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={handleBtnClicked}
                        />,
                        <RemovePerson
                            id={id}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    ]}
                >
                    {firstName} {lastName}
                    {editCar ?
                        (<UpdateCar
                            id={carId}
                            year={year}
                            make={make}
                            model={model}
                            price={price}
                            personId={personId}
                            onBtnClicked={handleCarBtnClicked}
                        />)
                        :
                        (personCars && personCars.map(({ id, year, make, model, price, personId }) => (
                            <Car
                                id={id}
                                year={year}
                                make={make}
                                model={model}
                                price={price}
                                personId={personId}
                                handleCarBtnClicked={handleCarBtnClicked}
                            />
                        )))
                    }
                    <Link
                        to={`/person/${id}`}
                    >
                        Learn More
                    </Link>
                </Card>)
            }
        </div >
    )
}

export default Person;