import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";
import PersonTitle from "../layout/PersonTitle";

const AddPerson = () => {
    const [id] = useState(uuidv4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [addPerson] = useMutation(ADD_PERSON);

    useEffect(() => {
        forceUpdate({})
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values;

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({
                    query: GET_PEOPLE
                })
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson],
                    }
                })
            }
        })
        form.resetFields();
    }

    return (
        <>
            <PersonTitle />
            <Form
                form={form}
                name="add-person-form"
                onFinish={onFinish}
                layout="inline"
                size="medium"
                style={{
                    marginBottom: "40px"
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
                            disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                        >
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    )
}

export default AddPerson;