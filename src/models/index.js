// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { OrderItem, Order, Note, Butterfly, Organization, replacementCommonName, Module, SpeciesInfo, CreateOrderPayload } = initSchema(schema);

export {
  OrderItem,
  Order,
  Note,
  Butterfly,
  Organization,
  replacementCommonName,
  Module,
  SpeciesInfo,
  CreateOrderPayload
};