import React, { useState } from 'react'
import PasswordInputGroup from './PasswordInputGroup'
import RepeatedPasswordInputGroup from './RepeatedPasswordInputGroup'

const Passwords = () => {
  const [password, setPassword] = useState('')

  return (
    <div>
      <PasswordInputGroup setPassword={setPassword} />
      <RepeatedPasswordInputGroup password={password} />
    </div>
  )
}

export default Passwords
