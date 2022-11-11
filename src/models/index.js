// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Butterfly, Organization, Order, OrderItem, replacementCommonName, Module, SpeciesInfo, Image } = initSchema(schema);

export {
  Note,
  Butterfly,
  Organization,
  Order,
  OrderItem,
  replacementCommonName,
  Module,
  SpeciesInfo,
  Image
};