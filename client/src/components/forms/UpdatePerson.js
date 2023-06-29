import { useMutation } from "@apollo/client";
import { Form, Button, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = props => {

    const { id, firstName, lastName } = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updatePerson] = useMutation(UPDATE_PERSON);

    useEffect(() => {
        forceUpdate({})
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values;

        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            },
        })
        props.onBtnClicked();
    }

    return (
        <Form
            form={form}
            name="update-person-form"
            onFinish={onFinish}
            layout="inline"
            size="medium"
            initialValues={{
                firstName,
                lastName
            }}
        >
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[{
                    required: true,
                    message: "Please input the first name"
                }]}
            >
                <Input
                    placeholder="First Name"
                />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{
                    required: true,
                    message: "Please input the last name"
                }]}
            >
                <Input
                    placeholder="Last Name"
                />
            </Form.Item>
            <Form.Item
                shouldUpdate={true}
            >
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={(!form.isFieldTouched("firstName") && !form.isFieldTouched("lastName")) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                    >
                        Update Person
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

export default UpdatePerson;