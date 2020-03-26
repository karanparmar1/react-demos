import React from "react";
import Header from "./Header";
const SpaceX = ({ data, classes }) => (
  <div style={{ textAlign: "left" }}>
    <br /><br /> <br />
    <Header headerStyle={classes.heading} title="spaceX" subtitle="Exploring Space" iconClass="fa fa-rocket fa-3x icon-gradient" />

    <table border="1" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <th>id</th>
          <th>Mission</th>
          <th>Rocket</th>
        </tr>

        {
        data.map((launch, index) =>
          <tr key={index} >
            <td>{index}</td>
            <td>{launch.mission_name} </td>
            <td>{launch.rocket.rocket_name} </td>
          </tr>
        )
        }
      </tbody>

    </table>
  </div>
);

// <Wrapper data={data} loading={loading} error={error} />
;

export default SpaceX;
