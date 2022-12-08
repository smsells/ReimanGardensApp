import { Storage } from "aws-amplify";

async function getImage(name) {
  console.log("name", name);
  const image = await Storage.get(name);
  console.log("imag " + name + " imag" + image);

  return image;
}
