import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../queries";

const UpdateCar = props => {
    const { carId, year, make, model, price, personId } = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updateCar] = useMutation(UPDATE_CAR);

    useEffect(() => {
        forceUpdate({})
    }, []);

    const onFinish = values => {
        const { carId, year, make, model, price, personId } = values;

        const yearConvert = parseInt(year, 10);
        const priceConvert = parseFloat(price);

        updateCar({
            variables: {
                id: carId,
                year: yearConvert,
                make,
                model,
                price: priceConvert,
                personId: personId || ""
            }
        })
        props.onBtnClicked();
    }

    return (
        <Form
            form={form}
            name="update-car-form"
            onFinish={onFinish}
            layout="inline"
            size="medium"
            initialValues={{
                year,
                make,
                model,
                price,
                personId
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
                />
            </Form.Item>
            {/* <Select
                defaultValue="Select a person"
                onChange={handleChange}
                value={selectedPerson}
            >
                {options}
            </Select> */}
            <Form.Item
                shouldUpdate={true}
            >
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={(!form.isFieldTouched("year") && !form.isFieldTouched("make") && !form.isFieldTouched("model") && !form.isFieldTouched("price")) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button
                onClick={props.onBtnClicked}
            >
                Cancel
            </Button>
        </Form>
    )

}

export default UpdateCar;