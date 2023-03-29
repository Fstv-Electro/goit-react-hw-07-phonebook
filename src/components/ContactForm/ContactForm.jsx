import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import {
    FormField, Input, Label
} from './ContactForm.styled';
import Button from 'components/Button';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = () => {
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        number: '',
    };
    
    const handleSubmit = (contacts, { resetForm }) => {
        const contact = {
            id: nanoid(),
            ...contacts,
        };
        dispatch(addContact(contact));
        resetForm();
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form autoComplete='off'>
                <FormField>
                    <Label htmlFor='name'>
                    Name:
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                            />
                        <ErrorMessage name='name' component="div" />
                    </Label>
                </FormField>
                    
                <FormField>
                    <Label htmlFor='number'>
                    Number:
                    <Input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                    </Label>
                    <ErrorMessage name='number' component="div" />        
                </FormField>
                    
                    <Button type={'submit'} title={'Add contact'} />
            </Form>
        </Formik>
        </div>
    ); 
}

export default ContactForm;
