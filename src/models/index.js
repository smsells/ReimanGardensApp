// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



<<<<<<< HEAD
const { Note, Butterfly, Organization, replacementCommonName, Order, OrderItem, Module, SpeciesInfo, Image } = initSchema(schema);
=======
const { Note, Butterfly, Organization, Order, OrderItem, replacementCommonName, Module, SpeciesInfo, Image } = initSchema(schema);
>>>>>>> dc7472beda324670dc4dc81b8bdf4af8cfd64e43

export {
  Note,
  Butterfly,
  Organization,
  replacementCommonName,
  Order,
  OrderItem,
  Module,
  SpeciesInfo,
  Image
};