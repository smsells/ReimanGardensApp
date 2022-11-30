import { React, useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { SpeciesData } from "./SpeciesDistData";
import { FlightData } from "./FlightData";

const Stats = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const orgURL = pathName[1];
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);
  const [speciesData, setSpeciesData] = useState({
    labels: SpeciesData.map((data) => data.location),
    datasets: [
      {
        label: "Species Distribution",   //for pie chart 
        data: SpeciesData.map((data) => data.species),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const [flightData, setFlightData] = useState({
    labels: FlightData.map((data) => data.month),
    datasets: [
      {
        label: "Butterflies in Flight", //for bar chart
        data: SpeciesData.map((data) => data.butterflies),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

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
      <div style={{ width: 700 }}>
        <PieChart chartData={speciesData} />
      </div>
      <div style={{ width: 700 }}>
        <BarChart chartData={flightData} />
      </div>
    </div>
  );
};
export default Stats;
