import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

const validationSchema = yup.object({
    name: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
        .required('Name is required'),
    countryCode: yup
        .string()
        .oneOf(['US', 'CA', 'UK'], 'Invalid country code')
        .required('Country code is required'),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'Phone number must be numeric')
        .required('Phone number is required'),
});

const Form = ({ formType }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            countryCode: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                const response = await axios.post('http://localhost:3001/api/formData', { formType, ...values });
                console.log('Success:', response.data);

                // Submit data to Google Sheets
                const formData = new FormData();
                formData.append('formType', formType);
                formData.append('Name', values.name);
                formData.append('CountryCode', values.countryCode);
                formData.append('PhoneNumber', values.phoneNumber);

                await fetch('https://script.google.com/macros/s/AKfycbzxRi1OwoZLttj_DtmWFqXvBMTbvXbUK150Cl8kyRVCN-lvKx3yU1DkmYC8yIqnNRQh/exec', {
                    method: 'POST',
                    body: formData,
                });
                actions.resetForm();
                alert('Your details have been submitted successfully');
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting data');
            }
        },
    });

    const handleSyncAndOpenSheet = async () => {
        try {
            window.open('https://docs.google.com/spreadsheets/d/1voSIkK-AoPM4kxzk5mf6eoF91eIoH-4G2PkGQLO9S7I/edit?usp=sharing', '_blank');
        } catch (error) {
            console.error('Error syncing Google Sheet:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white mt-10 p-6 rounded-md shadow-md form">
            <h2 className="text-xl font-semibold mb-4 text-center">{formType === 'A' ? 'Form A' : 'Form B'}</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="countryCode" className="block text-gray-700 mb-1">Country Code</label>
                    <select
                        id="countryCode"
                        name="countryCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.countryCode}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="" label="Select country code" />
                        <option value="US" label="US" />
                        <option value="CA" label="CA" />
                        <option value="UK" label="UK" />
                    </select>
                    {formik.touched.countryCode && formik.errors.countryCode ? (
                        <div className="text-red-600 text-sm mt-1">{formik.errors.countryCode}</div>
                    ) : null}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className="text-red-600 text-sm mt-1">{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

                <div className="flex justify-center space-x-4">
                    <button type="submit" className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Submit</button>
                    <button
                        onClick={handleSyncAndOpenSheet}
                        className="w-full sm:w-auto bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
                    >
                        Click to see the Excel Sheet
                    </button>
                </div>
            </form>

            <div className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
            </div>
        </div>
    );
};

export default Form;
