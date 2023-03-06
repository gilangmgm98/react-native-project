import { useQuery, gql } from '@apollo/client'

export const  GET_ALL_FOOD = gql`
query GetFoods {
  getFoods {
    id
    name
    description
    price
    imgUrl
    mongoId
    categoryId
    Ingredients {
      id
      itemId
      name
    }
    Category {
      id
      name
    }
  }
}
`

export const GET_ALL_CATEGORY = gql`
query GetCategory {
  getCategory {
    id
    name
  }
}
`

export const GET_FOOD_BY_ID = gql`
query GetFood($getFoodId: Int) {
  getFood(id: $getFoodId) {
    id
    name
    description
    price
    imgUrl
    mongoId
    categoryId
    Ingredients {
      id
      itemId
      name
    }
    Category {
      id
      name
    }
  }
}
`

