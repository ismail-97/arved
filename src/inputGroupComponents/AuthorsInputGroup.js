import React, { useState } from 'react'

import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'
import AddIcon from '../iconComponents/icons/AddIcon'
import RemoveIcon from '../iconComponents/icons/RemoveIcon'
import { v4 as uuidv4 } from 'uuid'

const AuthorsInputGroup = (props) => {
  const [authors, setAuthors] = useState(
    props.authors
      ? props.authors.map((author) => ({ id: uuidv4(), value: author }))
      : [{ id: uuidv4(), value: '' }]
  )

  const addAuthor = () => {
    setAuthors([...authors, { id: uuidv4(), value: '' }])
  }

  const deleteAuthor = (id) => {
    setAuthors(authors.filter((author) => author.id !== id))
  }

  const handleAuthorChange = (id, value) => {
    setAuthors(
      authors.map((author) =>
        author.id === id ? { ...author, value } : author
      )
    )
  }

  return (
    <div>
      <InputGroup className="arved-input-group">
        <button type="button" className="no-style" onClick={addAuthor}>
          <AddIcon />
        </button>
        <FormattedMessage id="author">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label2 label-with-2-icons text-capitalize"
              type="text"
              name="authors"
              placeholder={placeholder}
              required={props.isRequired === false ? false : true}
              value={authors[0]?.value || ''}
              onChange={(e) =>
                handleAuthorChange(authors[0]?.id, e.target.value)
              }
            />
          )}
        </FormattedMessage>
        <AuthorIcon />
      </InputGroup>
      <MultiAuthorsInputGroup
        authors={authors.slice(1)}
        deleteAuthor={deleteAuthor}
        handleAuthorChange={handleAuthorChange}
        isRequired={props.isRequired}
      />
    </div>
  )
}

const MultiAuthorsInputGroup = ({
  authors,
  deleteAuthor,
  handleAuthorChange,
  isRequired,
}) => {
  return (
    <div>
      {authors.map(({ id, value }) => (
        <InputGroup className="arved-input-group" key={id}>
          <button
            type="button"
            className="no-style"
            onClick={() => deleteAuthor(id)}
          >
            <RemoveIcon />
          </button>
          <FormattedMessage id="author">
            {(placeholder) => (
              <Form.Control
                className="arved-input-label2 label-with-2-icons"
                type="text"
                name="authors"
                placeholder={placeholder}
                required={isRequired === false ? false : true}
                value={value}
                onChange={(e) => handleAuthorChange(id, e.target.value)}
              />
            )}
          </FormattedMessage>
          <AuthorIcon />
        </InputGroup>
      ))}
    </div>
  )
}
export default AuthorsInputGroup
