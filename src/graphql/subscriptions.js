/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
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
  subscription OnUpdateNote {
    onUpdateNote {
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
  subscription OnDeleteNote {
    onDeleteNote {
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
  subscription OnCreateButterfly {
    onCreateButterfly {
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
  subscription OnUpdateButterfly {
    onUpdateButterfly {
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
  subscription OnDeleteButterfly {
    onDeleteButterfly {
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
  subscription OnCreateOrganization {
    onCreateOrganization {
      name
      locationCity
      locationState
      Shipments {
        orderNumber
        shipmentDate
        arrivalDate
        supplier
        packingList {
          species
          numReceived
          emergedInTransit
          damagedInTransit
          diseased
          parasites
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
      }
      commonNameList {
        buttery {
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
        id
        createdAt
        updatedAt
      }
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      activeModules {
        title
        content
        id
        createdAt
        updatedAt
      }
      inactiveModules {
        title
        content
        id
        createdAt
        updatedAt
      }
      speciesInfoList {
        name
        numInFlight
        totalReceived
        firstFlown
        lastFlown
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      name
      locationCity
      locationState
      Shipments {
        orderNumber
        shipmentDate
        arrivalDate
        supplier
        packingList {
          species
          numReceived
          emergedInTransit
          damagedInTransit
          diseased
          parasites
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
      }
      commonNameList {
        buttery {
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
        id
        createdAt
        updatedAt
      }
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      activeModules {
        title
        content
        id
        createdAt
        updatedAt
      }
      inactiveModules {
        title
        content
        id
        createdAt
        updatedAt
      }
      speciesInfoList {
        name
        numInFlight
        totalReceived
        firstFlown
        lastFlown
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      name
      locationCity
      locationState
      Shipments {
        orderNumber
        shipmentDate
        arrivalDate
        supplier
        packingList {
          species
          numReceived
          emergedInTransit
          damagedInTransit
          diseased
          parasites
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
      }
      commonNameList {
        buttery {
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
        id
        createdAt
        updatedAt
      }
      headerColor
      sectionHeaderColor
      menuColor
      linkFontColor
      adminIconColor
      homepageBackground
      font
      logo
      coverMedia
      activeModules {
        title
        content
        id
        createdAt
        updatedAt
      }
      inactiveModules {
        title
        content
        id
        createdAt
        updatedAt
      }
      speciesInfoList {
        name
        numInFlight
        totalReceived
        firstFlown
        lastFlown
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReplacementCommonName = /* GraphQL */ `
  subscription OnCreateReplacementCommonName {
    onCreateReplacementCommonName {
      buttery {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReplacementCommonName = /* GraphQL */ `
  subscription OnUpdateReplacementCommonName {
    onUpdateReplacementCommonName {
      buttery {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReplacementCommonName = /* GraphQL */ `
  subscription OnDeleteReplacementCommonName {
    onDeleteReplacementCommonName {
      buttery {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      orderNumber
      shipmentDate
      arrivalDate
      supplier
      packingList {
        species
        numReceived
        emergedInTransit
        damagedInTransit
        diseased
        parasites
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      orderNumber
      shipmentDate
      arrivalDate
      supplier
      packingList {
        species
        numReceived
        emergedInTransit
        damagedInTransit
        diseased
        parasites
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      orderNumber
      shipmentDate
      arrivalDate
      supplier
      packingList {
        species
        numReceived
        emergedInTransit
        damagedInTransit
        diseased
        parasites
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrderItem = /* GraphQL */ `
  subscription OnCreateOrderItem {
    onCreateOrderItem {
      species
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrderItem = /* GraphQL */ `
  subscription OnUpdateOrderItem {
    onUpdateOrderItem {
      species
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrderItem = /* GraphQL */ `
  subscription OnDeleteOrderItem {
    onDeleteOrderItem {
      species
      numReceived
      emergedInTransit
      damagedInTransit
      diseased
      parasites
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModule = /* GraphQL */ `
  subscription OnCreateModule {
    onCreateModule {
      title
      content
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModule = /* GraphQL */ `
  subscription OnUpdateModule {
    onUpdateModule {
      title
      content
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModule = /* GraphQL */ `
  subscription OnDeleteModule {
    onDeleteModule {
      title
      content
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSpeciesInfo = /* GraphQL */ `
  subscription OnCreateSpeciesInfo {
    onCreateSpeciesInfo {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSpeciesInfo = /* GraphQL */ `
  subscription OnUpdateSpeciesInfo {
    onUpdateSpeciesInfo {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSpeciesInfo = /* GraphQL */ `
  subscription OnDeleteSpeciesInfo {
    onDeleteSpeciesInfo {
      name
      numInFlight
      totalReceived
      firstFlown
      lastFlown
      id
      createdAt
      updatedAt
    }
  }
`;
