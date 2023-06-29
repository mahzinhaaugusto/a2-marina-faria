import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
// import { useState } from "react";


const Car = props => {
    const { id, year, make, model, price, personId, handleCarBtnClicked } = props;
    // const [edit, setEdit] = useState(false);

    return (

        <Card
            type="inner"
            title={`${year} ${make} ${model} -> $ ${price}`}
            style={{ marginTop: 16 }}
            actions={[
                <EditOutlined
                    key="edit"
                    onClick={handleCarBtnClicked}
                />,
                <RemoveCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                />
            ]}
        >
            {/* {year} {make} {model} &rarr; $ {price} */}
        </Card>
    )
}

export default Car;