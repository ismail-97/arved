import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import FileUploadIcon from '../iconComponents/icons/FileUploadIcon'
import DocumentIcon from '../iconComponents/icons/DocumentIcon'
import React, { useState } from 'react'

const FileInputGroup = () => {
    const [file, setFile] = useState('')
    const onChangeFile = (event) => {
        setFile(event.target.files[0])
    }
    return (
        <InputGroup className="arved-input-group">
            <FileUploadIcon />
            <FormattedMessage id="document">
                { placeholder => <Form.Control
                    className= "arved-input-label2 label-with-2-icons"
                    type="file"
                    name="file"
                    onChange={ event => onChangeFile(event)}
                    placeholder={placeholder}
                   
                    required
                    />
                }
            </FormattedMessage>
            <DocumentIcon/>
        </InputGroup>  
    )
}
export default FileInputGroup