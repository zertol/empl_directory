import {useState,} from 'react';

//Form hook to reuse throughout the application and preserve state
export const useForm = (callback, initialState ={}, validate) =>{
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const onChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const errorsV = validate(values);

        if (Object.keys(errorsV).length > 0) {
            setErrors(errorsV);
        }
        else{
            callback();
            setValues(initialState);
            setErrors({});
        }
    }

    return {
        onChange,
        onSubmit,
        errors,
        values
    }
};