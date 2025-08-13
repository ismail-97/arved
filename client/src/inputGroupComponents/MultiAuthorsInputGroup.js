import React from 'react';

import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'
import RemoveIcon from '../iconComponents/icons/RemoveIcon'


const MultiAuthorsInputGroup = ({ authors, deleteAuthor, defaultValues }) => {

    return (
        <div>
            {authors.map(author =>
                <InputGroup className="arved-input-group" key={author}>
                    <button
                        type="button"
                        className="no-style"
                        onClick={() => deleteAuthor(authors.indexOf(author))} >
                        <RemoveIcon />
                    </button>
                    <FormattedMessage id="author" >
                        {placeholder => <Form.Control  
                            className= "arved-input-label2 label-with-2-icons  text-capitalize"
                            type="text"
                            name="authors"
                            placeholder={placeholder} 
                            required
                            defaultValue={defaultValues ?  defaultValues[authors.indexOf(author)] : '' }
                            />
                        }
                    </FormattedMessage>
                    <AuthorIcon />
                </InputGroup>       
            )}  
        </div>    
    )
}

export default MultiAuthorsInputGroup