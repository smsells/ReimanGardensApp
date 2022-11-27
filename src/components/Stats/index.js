import { React, useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import { useLocation } from "react-router-dom";

const Stats = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const orgURL = pathName[1];
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      await Auth.signIn("dummy1234", "dummy1234");
      const props = await getProps(orgURL);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
  }, []);
  return (
    <div className="Stats">
      <AppHeader
        organizationProp={organization}
        imagesProp={images}
        menuProp={<AppMenu organizationProp={organization} admin={false} />}
      />
      <header> Stats Page </header>
    </div>
  );
};
export default Stats;
