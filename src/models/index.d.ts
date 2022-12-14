import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type NoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ButterflyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrganizationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type replacementCommonNameMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ModuleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SpeciesInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ButterflyInFlightMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Note {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Note, NoteMetaData>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note, NoteMetaData>) => MutableModel<Note, NoteMetaData> | void): Note;
}

export declare class Butterfly {
  readonly id: string;
  readonly scientificName?: string | null;
  readonly commonName?: string | null;
  readonly image?: string | null;
  readonly family?: string | null;
  readonly subfamily?: string | null;
  readonly lifespan?: string | null;
  readonly range?: string | null;
  readonly hosts?: string | null;
  readonly food?: string | null;
  readonly habitat?: string | null;
  readonly flights?: string | null;
  readonly history?: string | null;
  readonly funFact?: string | null;
  readonly etymology?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Butterfly, ButterflyMetaData>);
  static copyOf(source: Butterfly, mutator: (draft: MutableModel<Butterfly, ButterflyMetaData>) => MutableModel<Butterfly, ButterflyMetaData> | void): Butterfly;
}

export declare class Organization {
  readonly id: string;
  readonly name?: string | null;
  readonly orgURL?: string | null;
  readonly username?: string | null;
  readonly locationAddress?: string | null;
  readonly locationZipCode?: string | null;
  readonly locationCity?: string | null;
  readonly locationState?: string | null;
  readonly locationCountry?: string | null;
  readonly locationLongitude?: string | null;
  readonly locationLatitude?: string | null;
  readonly headerColor?: string | null;
  readonly sectionHeaderColor?: string | null;
  readonly menuColor?: string | null;
  readonly linkFontColor?: string | null;
  readonly adminIconColor?: string | null;
  readonly homepageBackground?: string | null;
  readonly font?: string | null;
  readonly logo?: string | null;
  readonly coverMedia?: string | null;
  readonly deleted?: boolean | null;
  readonly suspended?: boolean | null;
  readonly featuredButterflyDate?: string | null;
  readonly featuredButterflyID?: string | null;
  readonly displayFeaturedButterfly?: boolean | null;
  readonly displayHomeStats?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Organization, OrganizationMetaData>);
  static copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}

export declare class replacementCommonName {
  readonly id: string;
  readonly butterfly?: Butterfly | null;
  readonly newName?: string | null;
  readonly orgID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly replacementCommonNameButterflyId?: string | null;
  constructor(init: ModelInit<replacementCommonName, replacementCommonNameMetaData>);
  static copyOf(source: replacementCommonName, mutator: (draft: MutableModel<replacementCommonName, replacementCommonNameMetaData>) => MutableModel<replacementCommonName, replacementCommonNameMetaData> | void): replacementCommonName;
}

export declare class Order {
  readonly id: string;
  readonly orderNumber?: number | null;
  readonly shipmentDate?: string | null;
  readonly arrivalDate?: string | null;
  readonly supplier?: string | null;
  readonly orgID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class OrderItem {
  readonly id: string;
  readonly species?: string | null;
  readonly commonName?: string | null;
  readonly numReceived?: number | null;
  readonly emergedInTransit?: number | null;
  readonly damagedInTransit?: number | null;
  readonly diseased?: number | null;
  readonly parasites?: number | null;
  readonly poorEmerged?: number | null;
  readonly numEmerged?: number | null;
  readonly numReleased?: number | null;
  readonly orgID?: string | null;
  readonly orderID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<OrderItem, OrderItemMetaData>);
  static copyOf(source: OrderItem, mutator: (draft: MutableModel<OrderItem, OrderItemMetaData>) => MutableModel<OrderItem, OrderItemMetaData> | void): OrderItem;
}

export declare class Module {
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly image?: string | null;
  readonly active?: number | null;
  readonly orgID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Module, ModuleMetaData>);
  static copyOf(source: Module, mutator: (draft: MutableModel<Module, ModuleMetaData>) => MutableModel<Module, ModuleMetaData> | void): Module;
}

export declare class SpeciesInfo {
  readonly id: string;
  readonly name?: string | null;
  readonly numInFlight?: number | null;
  readonly totalReceived?: number | null;
  readonly firstFlown?: string | null;
  readonly lastFlown?: string | null;
  readonly lastUpdated?: string | null;
  readonly orgID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SpeciesInfo, SpeciesInfoMetaData>);
  static copyOf(source: SpeciesInfo, mutator: (draft: MutableModel<SpeciesInfo, SpeciesInfoMetaData>) => MutableModel<SpeciesInfo, SpeciesInfoMetaData> | void): SpeciesInfo;
}

export declare class Image {
  readonly id: string;
  readonly butterflyName?: string | null;
  readonly imageAddress?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Image, ImageMetaData>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image, ImageMetaData>) => MutableModel<Image, ImageMetaData> | void): Image;
}

export declare class ButterflyInFlight {
  readonly id: string;
  readonly scientificName?: string | null;
  readonly dateReleased?: string | null;
  readonly lifeSpan?: number | null;
  readonly OrgID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ButterflyInFlight, ButterflyInFlightMetaData>);
  static copyOf(source: ButterflyInFlight, mutator: (draft: MutableModel<ButterflyInFlight, ButterflyInFlightMetaData>) => MutableModel<ButterflyInFlight, ButterflyInFlightMetaData> | void): ButterflyInFlight;
}