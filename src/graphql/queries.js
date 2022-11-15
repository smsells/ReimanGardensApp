/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getButterfly = /* GraphQL */ `
  query GetButterfly($id: ID!) {
    getButterfly(id: $id) {
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
export const listButterflies = /* GraphQL */ `
  query ListButterflies(
    $filter: ModelButterflyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listButterflies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      name
      username
      locationCity
      locationState
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      id
      createdAt
      updatedAt
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        username
        locationCity
        locationState
        headerColor
        sectionHeaderColor
        menuColor
        linkFontColor
        adminIconColor
        homepageBackground
        font
        logo
        coverMedia
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReplacementCommonName = /* GraphQL */ `
  query GetReplacementCommonName($id: ID!) {
    getReplacementCommonName(id: $id) {
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
export const listReplacementCommonNames = /* GraphQL */ `
  query ListReplacementCommonNames(
    $filter: ModelReplacementCommonNameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplacementCommonNames(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        orderNumber
        shipmentDate
        arrivalDate
        supplier
        orgID
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrderItem = /* GraphQL */ `
  query GetOrderItem($id: ID!) {
    getOrderItem(id: $id) {
      species
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
export const listOrderItems = /* GraphQL */ `
  query ListOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        species
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
      nextToken
    }
  }
`;
export const getModule = /* GraphQL */ `
  query GetModule($id: ID!) {
    getModule(id: $id) {
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
export const listModules = /* GraphQL */ `
  query ListModules(
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        content
        image
        active
        orgID
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSpeciesInfo = /* GraphQL */ `
  query GetSpeciesInfo($id: ID!) {
    getSpeciesInfo(id: $id) {
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
export const listSpeciesInfos = /* GraphQL */ `
  query ListSpeciesInfos(
    $filter: ModelSpeciesInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpeciesInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      butterflyName
      imageAddress
      createdAt
      updatedAt
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        butterflyName
        imageAddress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
