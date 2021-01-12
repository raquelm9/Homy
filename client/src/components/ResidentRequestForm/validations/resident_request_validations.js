import * as Yup from 'yup'

export const AddRestaurantValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be 3 characters at minimum')
        .required('Name is required'),
    website: Yup.string()
        .min(3, 'Website must be 3 characters at minimum')
        .required('Website is required'),
    description: Yup.string()
        .min(3, 'Description must be 3 characters at minimum')
        .required('Description is required'),
    image: Yup.mixed(),
    addressUnit: Yup.number()
        .min(1, 'Unit must be 1 number at minimum')
        .required('Unit is required'),
    addressStreet: Yup.string()
        .min(1, 'Street must be 1 character at minimum')
        .required('Street is required'),
    addressPostalcode: Yup.string()
        .min(1, 'Postal Code must be 1 character at minimum')
        .required('Postal Code is required'),
    addressCity: Yup.string().required('City is required'),
    addressProvince: Yup.string().required('Province is required'),
    addressLatitude: Yup.number().required('Latitude is required'),
    addressLongitude: Yup.number().required('Longitude is required'),
})
