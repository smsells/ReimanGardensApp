/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShipment = /* GraphQL */ `
  mutation CreateShipment(
    $input: CreateShipmentInput!
    $condition: ModelShipmentConditionInput
  ) {
    createShipment(input: $input, condition: $condition) {
      id
      Species
      Common Name
      No rec
      Supplier
      Ship date
      Arrival date
      Emerg. in transit
      Damage in transit
      No. disea
      No. parasit
      No emerg
      Poor emerg
    }
  }
`;
export const updateShipment = /* GraphQL */ `
  mutation UpdateShipment(
    $input: UpdateShipmentInput!
    $condition: ModelShipmentConditionInput
  ) {
    updateShipment(input: $input, condition: $condition) {
      id
      Species
      Common Name
      No rec
      Supplier
      Ship date
      Arrival date
      Emerg. in transit
      Damage in transit
      No. disea
      No. parasit
      No emerg
      Poor emerg
    }
  }
`;
export const deleteShipment = /* GraphQL */ `
  mutation DeleteShipment(
    $input: DeleteShipmentInput!
    $condition: ModelShipmentConditionInput
  ) {
    deleteShipment(input: $input, condition: $condition) {
      id
      Species
      Common Name
      No rec
      Supplier
      Ship date
      Arrival date
      Emerg. in transit
      Damage in transit
      No. disea
      No. parasit
      No emerg
      Poor emerg
    }
  }
`;
