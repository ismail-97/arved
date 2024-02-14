import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'
import AddIcon from '../iconComponents/icons/AddIcon'
import RemoveIcon from '../iconComponents/icons/RemoveIcon'

let i = 0
let firstRendering = true
let defaultFields = []

const FieldsOfStudyInputGroup = () => {

    const [fields, setFields] = useState([])

    const addField = () => {
        setFields(fields.concat(i++))
    }

    const deleteField = (index) => {
        setFields([].concat(fields.slice(0, index), fields.slice(index+1)))
    }   
    return (
        <div>
            <InputGroup className="arved-input-group">
                <button
                    type="button"
                    className="no-style"
                    onClick={addField} >
                    <AddIcon />
                </button>
                <FormattedMessage id="studyField"  >
                    {placeholder => <Form.Control  
                        className="arved-input-label2 label-with-2-icons"
                        type="text"
                        name="studyFields"
                        placeholder={placeholder} 
                        required
                    />
                    }
                </FormattedMessage>
                <ListIcon/>
            </InputGroup>
            <OtherFields fields={fields} deleteField={deleteField}/>
        </div>
    )
}


const OtherFields = ({fields, deleteField }) => {

    return (
        <div>
            {fields.map(field =>
                <InputGroup className="arved-input-group" key={field}>
                    <button
                        type="button"
                        className="no-style"
                        onClick={() => deleteField(fields.indexOf(field))} >
                        <RemoveIcon />
                    </button>
                    <FormattedMessage id="studyField" >
                        {placeholder => <Form.Control  
                            className= "arved-input-label2 label-with-2-icons"
                            type="text"
                            name="studyFields"
                            placeholder={placeholder} 
                            required
                        />
                        }
                    </FormattedMessage>
                    <ListIcon />
                </InputGroup>       
            )}  
        </div>    
    )
}

export default FieldsOfStudyInputGroup
