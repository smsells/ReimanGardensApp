/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateButterfly = /* GraphQL */ `
  subscription OnCreateButterfly(
    $filter: ModelSubscriptionButterflyFilterInput
  ) {
    onCreateButterfly(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateButterfly = /* GraphQL */ `
  subscription OnUpdateButterfly(
    $filter: ModelSubscriptionButterflyFilterInput
  ) {
    onUpdateButterfly(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteButterfly = /* GraphQL */ `
  subscription OnDeleteButterfly(
    $filter: ModelSubscriptionButterflyFilterInput
  ) {
    onDeleteButterfly(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReplacementCommonName = /* GraphQL */ `
  subscription OnCreateReplacementCommonName(
    $filter: ModelSubscriptionReplacementCommonNameFilterInput
  ) {
    onCreateReplacementCommonName(filter: $filter) {
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
export const onUpdateReplacementCommonName = /* GraphQL */ `
  subscription OnUpdateReplacementCommonName(
    $filter: ModelSubscriptionReplacementCommonNameFilterInput
  ) {
    onUpdateReplacementCommonName(filter: $filter) {
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
export const onDeleteReplacementCommonName = /* GraphQL */ `
  subscription OnDeleteReplacementCommonName(
    $filter: ModelSubscriptionReplacementCommonNameFilterInput
  ) {
    onDeleteReplacementCommonName(filter: $filter) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
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
export const onCreateOrderItem = /* GraphQL */ `
  subscription OnCreateOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onCreateOrderItem(filter: $filter) {
      species
      commonName
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      poorEmerged
      numEmerged
      orgID
      orderID
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrderItem = /* GraphQL */ `
  subscription OnUpdateOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onUpdateOrderItem(filter: $filter) {
      species
      commonName
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      poorEmerged
      numEmerged
      orgID
      orderID
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrderItem = /* GraphQL */ `
  subscription OnDeleteOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onDeleteOrderItem(filter: $filter) {
      species
      commonName
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      poorEmerged
      numEmerged
      orgID
      orderID
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModule = /* GraphQL */ `
  subscription OnCreateModule($filter: ModelSubscriptionModuleFilterInput) {
    onCreateModule(filter: $filter) {
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
export const onUpdateModule = /* GraphQL */ `
  subscription OnUpdateModule($filter: ModelSubscriptionModuleFilterInput) {
    onUpdateModule(filter: $filter) {
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
export const onDeleteModule = /* GraphQL */ `
  subscription OnDeleteModule($filter: ModelSubscriptionModuleFilterInput) {
    onDeleteModule(filter: $filter) {
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
export const onCreateSpeciesInfo = /* GraphQL */ `
  subscription OnCreateSpeciesInfo(
    $filter: ModelSubscriptionSpeciesInfoFilterInput
  ) {
    onCreateSpeciesInfo(filter: $filter) {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSpeciesInfo = /* GraphQL */ `
  subscription OnUpdateSpeciesInfo(
    $filter: ModelSubscriptionSpeciesInfoFilterInput
  ) {
    onUpdateSpeciesInfo(filter: $filter) {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSpeciesInfo = /* GraphQL */ `
  subscription OnDeleteSpeciesInfo(
    $filter: ModelSubscriptionSpeciesInfoFilterInput
  ) {
    onDeleteSpeciesInfo(filter: $filter) {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      orgID
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($filter: ModelSubscriptionImageFilterInput) {
    onCreateImage(filter: $filter) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($filter: ModelSubscriptionImageFilterInput) {
    onUpdateImage(filter: $filter) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($filter: ModelSubscriptionImageFilterInput) {
    onDeleteImage(filter: $filter) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
