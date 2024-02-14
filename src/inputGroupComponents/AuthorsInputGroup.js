import React, { useState } from 'react';

import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'
import AddIcon from '../iconComponents/icons/AddIcon'
// import MultiAuthorsInputGroup from '../inputGroupComponents/MultiAuthorsInputGroup'
import RemoveIcon from '../iconComponents/icons/RemoveIcon'

let i = 0
let firstRendering = true
let defaultAuthors = []
const AuthorsInputGroup = ({ iconsNo, defaultValues }) => {

    const [authors, setAuthors] = useState([])
    const [values, setValues] = useState([])
    
    //handleing default values
    if (defaultValues && firstRendering) {
        setValues(values.concat(defaultValues))

        for (let j = 0; j < defaultValues.length - 1; j++)
            defaultAuthors = defaultAuthors.concat(i++)
        setAuthors(authors.concat(defaultAuthors))

        firstRendering = false
    }

    const addAuthor = () => {
        setAuthors(authors.concat(i++))
        setValues(values.concat(""))
    }

    const deleteAuthor = (index) => {
        setAuthors([].concat(authors.slice(0, index), authors.slice(index + 1)))
        setValues([].concat(values.slice(0, index), values.slice(index + 1)))
    } 

    return (
        <div>
            <InputGroup className="arved-input-group">
                <button
                    type="button"
                    className="no-style"
                    onClick={addAuthor} >
                    <AddIcon />
                </button>
                <FormattedMessage id="author" >
                    {placeholder => <Form.Control  
                        className= "arved-input-label2 label-with-2-icons text-capitalize"
                        type="text"
                        name="authors"
                        placeholder={placeholder}
                        defaultValue={defaultValues && defaultValues.length > 0 ? defaultValues[0] : ''}
                        // required
                    />
                    }
                </FormattedMessage>
                <AuthorIcon/>
            </InputGroup>
            <MultiAuthorsInputGroup
                authors={authors}
                deleteAuthor={deleteAuthor}
                defaultValues={values.slice(1)} />
        </div>
    )
}

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
                            className= "arved-input-label2 label-with-2-icons"
                            type="text"
                            name="authors"
                            placeholder={placeholder} 
                            required
                            defaultValue={defaultValues[authors.indexOf(author)]}
                        />
                        }
                    </FormattedMessage>
                    <AuthorIcon/>
                </InputGroup>       
            )}  
        </div>    
    )
}
export default AuthorsInputGroup