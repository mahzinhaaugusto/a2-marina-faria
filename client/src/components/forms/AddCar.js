import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
import CarTitle from "../layout/CarTitle";

const { Option } = Select;

const AddCar = () => {
    const [id] = useState(uuidv4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [addCar] = useMutation(ADD_CAR);
    const { data } = useQuery(GET_PEOPLE);
    const [selectedPerson, setSelectedPerson] = useState(null);
    // const [priceFloat, setPriceFloat] = useState(null);

    useEffect(() => {
        forceUpdate({})
    }, []);

    const onFinish = values => {
        const { year, make, model, price } = values;

        const yearConvert = parseInt(year, 10);
        const priceConvert = parseFloat(price);

        addCar({
            variables: {
                id,
                year: yearConvert,
                make,
                model,
                price: priceConvert,
                personId: selectedPerson || ""
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({
                    query: GET_CARS
                })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
        form.resetFields();
    }

    const handleChange = (value) => {
        setSelectedPerson(value);
    }

    // console.log(selectedPerson);

    const options = data?.people.map((person) => (
        <Option
            key={person.id}
            value={person.id}
        >
            {person.firstName} {person.lastName}
        </Option>
    ))

    // const handlePriceChange = (e) => {
    //     const value = e.target.value;
    //     setPriceFloat(parseFloat(value));
    // }

    if (!data || !data.people || data.people.length === 0) {
        return null;
    }

    return (
        <>
            <CarTitle />
            <Form
                form={form}
                name="add-car-form"
                onFinish={onFinish}
                layout="inline"
                size="medium"
                style={{
                    marginBottom: "40px",
                }}
            >
                <Form.Item
                    name="year"
                    label="Year"
                    rules={[{
                        required: true,
                        message: "Please input the year"
                    }]}
                >
                    <Input
                        placeholder="Year"
                    />
                </Form.Item>
                <Form.Item
                    name="make"
                    label="Make"
                    rules={[{
                        required: true,
                        message: "Please input the make"
                    }]}
                >
                    <Input
                        placeholder="Make"
                    />
                </Form.Item>
                <Form.Item
                    name="model"
                    label="Model"
                    rules={[{
                        required: true,
                        message: "Please input the model"
                    }]}
                >
                    <Input
                        placeholder="Model"
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{
                        required: true,
                        message: "Please input the price"
                    }]}
                >
                    <Input
                        placeholder="$"
                    // onChange={handlePriceChange}
                    // value={priceFloat ? priceFloat.toLocaleString(undefined, { style: "currency", currency: "USD" }) : ""}
                    />
                </Form.Item>
                <Select
                    placeholder="Select a person"
                    // title="Person"
                    style={{
                        width: 180,
                        marginRight: 10
                    }}
                    onChange={handleChange}
                    value={selectedPerson}
                >
                    {options}
                </Select>
                <Form.Item
                    shouldUpdate={true}
                >
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                        >
                            Add Car
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    )
}

export default AddCar;