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
export const createButterfly = /* GraphQL */ `
  mutation CreateButterfly(
    $input: CreateButterflyInput!
    $condition: ModelButterflyConditionInput
  ) {
    createButterfly(input: $input, condition: $condition) {
      id
      scientificName
      commonName
      image
      family
      subfamily
      lifespan
      range
      hosts
      food
      habitat
      flights
      history
      funFact
      etymology
      createdAt
      updatedAt
    }
  }
`;
export const updateButterfly = /* GraphQL */ `
  mutation UpdateButterfly(
    $input: UpdateButterflyInput!
    $condition: ModelButterflyConditionInput
  ) {
    updateButterfly(input: $input, condition: $condition) {
      id
      scientificName
      commonName
      image
      family
      subfamily
      lifespan
      range
      hosts
      food
      habitat
      flights
      history
      funFact
      etymology
      createdAt
      updatedAt
    }
  }
`;
export const deleteButterfly = /* GraphQL */ `
  mutation DeleteButterfly(
    $input: DeleteButterflyInput!
    $condition: ModelButterflyConditionInput
  ) {
    deleteButterfly(input: $input, condition: $condition) {
      id
      scientificName
      commonName
      image
      family
      subfamily
      lifespan
      range
      hosts
      food
      habitat
      flights
      history
      funFact
      etymology
      createdAt
      updatedAt
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      name
      orgURL
      username
      locationAddress
      locationZipCode
      locationCity
      locationState
      locationCountry
      locationLongitude
      locationLatitude
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      deleted
      suspended
      featuredButterflyDate
      featuredButterflyID
      displayFeaturedButterfly
      displayHomeStats
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      name
      orgURL
      username
      locationAddress
      locationZipCode
      locationCity
      locationState
      locationCountry
      locationLongitude
      locationLatitude
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      deleted
      suspended
      featuredButterflyDate
      featuredButterflyID
      displayFeaturedButterfly
      displayHomeStats
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      name
      orgURL
      username
      locationAddress
      locationZipCode
      locationCity
      locationState
      locationCountry
      locationLongitude
      locationLatitude
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      deleted
      suspended
      featuredButterflyDate
      featuredButterflyID
      displayFeaturedButterfly
      displayHomeStats
      id
      createdAt
      updatedAt
    }
  }
`;
export const createReplacementCommonName = /* GraphQL */ `
  mutation CreateReplacementCommonName(
    $input: CreateReplacementCommonNameInput!
    $condition: ModelReplacementCommonNameConditionInput
  ) {
    createReplacementCommonName(input: $input, condition: $condition) {
      butterfly {
        id
        scientificName
        commonName
        image
        family
        subfamily
        lifespan
        range
        hosts
        food
        habitat
        flights
        history
        funFact
        etymology
        createdAt
        updatedAt
      }
      newName
      orgID
      id
      createdAt
      updatedAt
      replacementCommonNameButterflyId
    }
  }
`;
export const updateReplacementCommonName = /* GraphQL */ `
  mutation UpdateReplacementCommonName(
    $input: UpdateReplacementCommonNameInput!
    $condition: ModelReplacementCommonNameConditionInput
  ) {
    updateReplacementCommonName(input: $input, condition: $condition) {
      butterfly {
        id
        scientificName
        commonName
        image
        family
        subfamily
        lifespan
        range
        hosts
        food
        habitat
        flights
        history
        funFact
        etymology
        createdAt
        updatedAt
      }
      newName
      orgID
      id
      createdAt
      updatedAt
      replacementCommonNameButterflyId
    }
  }
`;
export const deleteReplacementCommonName = /* GraphQL */ `
  mutation DeleteReplacementCommonName(
    $input: DeleteReplacementCommonNameInput!
    $condition: ModelReplacementCommonNameConditionInput
  ) {
    deleteReplacementCommonName(input: $input, condition: $condition) {
      butterfly {
        id
        scientificName
        commonName
        image
        family
        subfamily
        lifespan
        range
        hosts
        food
        habitat
        flights
        history
        funFact
        etymology
        createdAt
        updatedAt
      }
      newName
      orgID
      id
      createdAt
      updatedAt
      replacementCommonNameButterflyId
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      orderNumber
      shipmentDate
      arrivalDate
      supplier
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      orderNumber
      shipmentDate
      arrivalDate
      supplier
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      orderNumber
      shipmentDate
      arrivalDate
      supplier
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const createOrderItem = /* GraphQL */ `
  mutation CreateOrderItem(
    $input: CreateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    createOrderItem(input: $input, condition: $condition) {
      species
      commonName
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      poorEmerged
      numEmerged
      numReleased
      orgID
      orderID
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderItem = /* GraphQL */ `
  mutation UpdateOrderItem(
    $input: UpdateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    updateOrderItem(input: $input, condition: $condition) {
      species
      commonName
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      poorEmerged
      numEmerged
      numReleased
      orgID
      orderID
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderItem = /* GraphQL */ `
  mutation DeleteOrderItem(
    $input: DeleteOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    deleteOrderItem(input: $input, condition: $condition) {
      species
      commonName
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      poorEmerged
      numEmerged
      numReleased
      orgID
      orderID
      id
      createdAt
      updatedAt
    }
  }
`;
export const createModule = /* GraphQL */ `
  mutation CreateModule(
    $input: CreateModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    createModule(input: $input, condition: $condition) {
      title
      content
      image
      active
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateModule = /* GraphQL */ `
  mutation UpdateModule(
    $input: UpdateModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    updateModule(input: $input, condition: $condition) {
      title
      content
      image
      active
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteModule = /* GraphQL */ `
  mutation DeleteModule(
    $input: DeleteModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    deleteModule(input: $input, condition: $condition) {
      title
      content
      image
      active
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const createSpeciesInfo = /* GraphQL */ `
  mutation CreateSpeciesInfo(
    $input: CreateSpeciesInfoInput!
    $condition: ModelSpeciesInfoConditionInput
  ) {
    createSpeciesInfo(input: $input, condition: $condition) {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      lastUpdated
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateSpeciesInfo = /* GraphQL */ `
  mutation UpdateSpeciesInfo(
    $input: UpdateSpeciesInfoInput!
    $condition: ModelSpeciesInfoConditionInput
  ) {
    updateSpeciesInfo(input: $input, condition: $condition) {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      lastUpdated
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteSpeciesInfo = /* GraphQL */ `
  mutation DeleteSpeciesInfo(
    $input: DeleteSpeciesInfoInput!
    $condition: ModelSpeciesInfoConditionInput
  ) {
    deleteSpeciesInfo(input: $input, condition: $condition) {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      lastUpdated
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
export const createButterflyInFlight = /* GraphQL */ `
  mutation CreateButterflyInFlight(
    $input: CreateButterflyInFlightInput!
    $condition: ModelButterflyInFlightConditionInput
  ) {
    createButterflyInFlight(input: $input, condition: $condition) {
      id
      scientificName
      dateReleased
      lifeSpan
      orgID
      inFlight
      createdAt
      updatedAt
    }
  }
`;
export const updateButterflyInFlight = /* GraphQL */ `
  mutation UpdateButterflyInFlight(
    $input: UpdateButterflyInFlightInput!
    $condition: ModelButterflyInFlightConditionInput
  ) {
    updateButterflyInFlight(input: $input, condition: $condition) {
      id
      scientificName
      dateReleased
      lifeSpan
      orgID
      inFlight
      createdAt
      updatedAt
    }
  }
`;
export const deleteButterflyInFlight = /* GraphQL */ `
  mutation DeleteButterflyInFlight(
    $input: DeleteButterflyInFlightInput!
    $condition: ModelButterflyInFlightConditionInput
  ) {
    deleteButterflyInFlight(input: $input, condition: $condition) {
      id
      scientificName
      dateReleased
      lifeSpan
      orgID
      inFlight
      createdAt
      updatedAt
    }
  }
`;
