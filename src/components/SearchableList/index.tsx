import { Container, List, ListItem } from '@mui/material'
import React from 'react'

export default function SearchableList() {
    const data = [
        {
          "name": "Harry Potter",
          "city": "London"
        },
        {
          "name": "Don Quixote",
          "city": "Madrid"
        },
        {
          "name": "Joan of Arc",
          "city": "Paris"
        },
        {
          "name": "Rosa Park",
          "city": "Alabama"
        }
    ]

  return (
    <Container>
        <List>
            {data.map((item: any) => {
                return <ListItem key={item.city}>
                    {item.name}
                </ListItem>
            })}
        </List>
    </Container>
  )
}
