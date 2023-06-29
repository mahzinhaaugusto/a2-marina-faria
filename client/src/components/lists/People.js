import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import { List } from "antd";
import Person from "../listItems/Person";
import RecordsTitle from "../layout/RecordsTitle";

const getStyles = () => ({
    list: {
        display: "flex",
        justifyContent: "center"
    }
})

const People = () => {
    const styles = getStyles();

    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    // console.log(data);

    if (!data || !data.people || data.people.length === 0) {
        return null;
    }

    return (
        <>
            <RecordsTitle />
            <List
                grid={{
                    gutter: 20,
                    column: 1
                }}
                style={styles.list}
            >
                {data.people.map(({ id, firstName, lastName }) => (
                    <>
                        <List.Item
                            key={id}
                        >
                            <Person
                                id={id}
                                firstName={firstName}
                                lastName={lastName}
                            />
                        </List.Item>
                    </>
                ))}
            </List>
        </>
    )
}

export default People;