import React from "react";
import Form from 'react-bootstrap/Form'
import { useField } from 'formik'

export const Input = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props.name)
    return (
        <Form.Group>
            <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            <Form.Control {...field} {...props} isInvalid={meta.touched && meta.error} />
            <Form.Control.Feedback type='invalid'>{meta.error}</Form.Control.Feedback>
            { helpText && <Form.Text className="text-muted">{helpText}</Form.Text> }
        </Form.Group>
    )

}

export const CheckInput = (props) => {
    const [field] = useField(props.name);
    return (
        <Form.Check {...field} {...props} defaultChecked={field.value === props.value ? true : false} />
    );
};
