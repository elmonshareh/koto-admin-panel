import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {

 
    captionpadding: '0',
    decimals: '1',
    theme: 'fusion',
  },
  data: [
    {
      label: "العاب",
      value: "1000"
    },
    {
      label: " مطاعم",
      value: "5300"
    },
    {
      label: "سوبر مركت",
      value: "1050"
    },
   
  ]
};

class BillChats extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="pie2d"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}
export default BillChats;