import { Title, Group, TextInput, Select, PasswordInput, Button } from '@mantine/core'
import { LockClosedIcon } from '@modulz/radix-icons'
import { useAuth } from 'hooks/useAuth';
import React from 'react'

export default function UpdateInfo({user, children}) {
  console.log(user)
  return (
    <div>
      {user}
    </div>
  )
}
