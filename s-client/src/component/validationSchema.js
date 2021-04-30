import { string, object, ref } from 'yup'

export const registerValidationSchema = object().shape({
    name: string().max(20).required('Required'),
    username: string().email().required('Required'),
    password: string().min(8, 'Password must be atleast 8 character').required('Required'),
    cnfpwd: string().oneOf([ref('password'), null], 'Password must match').required('Required'),
})


export const loginValidationSchema = object().shape({
    username: string().email().required('Required'),
    password: string().required('Required')
})