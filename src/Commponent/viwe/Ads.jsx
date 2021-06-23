import React, { Component } from 'react'
import { Route } from 'react-router'
import AddSurvay from './addSurvay'
import AddApp from './addApp'
import AddVedio from './addVedio'
import VideoDetailes from './details/videoDetails'
import SurvayDetailes from './details/survayDetails'
import AppDeatiles from './details/appDetails'
import VedioTable from './showTables/vedioTables';
import AppTable from './showTables/appTable';
import SurveyTable from './showTables/surveyTable';
import ChargingTable from './showTables/chargingTable';
import NotificationTables from './details/notificationTables';
class AddADS extends Component {
  state = {}
  handleSelect = (eventKey) => alert(`selected ${eventKey}`)
  render() {
    return (
      <div className="container pt-5">
        <div className="mx-3">
          <Route path="/admin/AddADS/AddVedio" component={AddVedio} />
          <Route path="/admin/AddADS/AddSurvay" component={AddSurvay} />
          <Route path="/admin/AddADS/AddApp" component={AddApp} />

          <Route
            path="/admin/AddADS/AddVedio:id"
            render={(props) => <VideoDetailes {...props} />}
          />
          <Route
            path="/admin/AddADS/survay:id"
            render={(props) => <SurvayDetailes {...props} />}
          />
          <Route
            path="/admin/AddADS/App:id"
            render={(props) => <AppDeatiles {...props} />}
          /> 
          <Route path="/admin/AddADS/VedioTable" component={VedioTable} />
          <Route path="/admin/AddADS/ApTable" component={AppTable} />
          <Route path="/admin/AddADS/SurveyTable" component={SurveyTable} />
          <Route path="/admin/AddADS/ChargingTable" component={ChargingTable} />
       

        </div>
      </div>
    )
  }
}

export default AddADS
