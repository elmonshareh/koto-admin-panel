import React, { Component } from 'react'
import Cart from './../variables/cart'
import { Card } from './../login/Card'
import VedioChart from './../Charts/vesioChat'
import ChargingChart from './../Charts/chargingChart'
import BillChats from './../Charts/bailChart'
import AppChart from './../Charts/appChart'
import axios from 'axios'
import UserChart from './../Charts/charts';
import ChargingChart2 from './../Charts/Charging2';
import SpinnerChart from './../variables/spinnerCharts';
class Main extends Component {
  state = {
    token: localStorage.getItem('token'),
    allUsers: '',
    allBlockedUser: '',
    allSurveys: '',
    allSurveySolved: '',
    allBills: '',
    allUsedBills: '',
    allCoubons: '',
    allUsedCoubons: '',
    allCards: '',
    allUsedCards: '',
    allKoto: '',
    allKotoWatch: '',
    allApp: '',
    allDownloadedApp: '',
    allAdmob: '',
    allUnity: '',
  }
  getCounterCategory = async () => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/dashboard/counter/category',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allUsers: resp.data.data.countAllUsers,
        allBlockedUser: resp.data.data.countBlockedUsers,
        allSurveys: resp.data.data.countAllSurveys,
        allSurveySolved: resp.data.data.countSolvedSurveys,
        allApp: resp.data.data.countAllApps,
        allDownloadedApp: resp.data.data.countDownloadedApps,
      })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  getCounterGift = async () => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/dashboard/counter/gift',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allBills: resp.data.data.countAllBills,
        allUsedBills: resp.data.data.countUsedBills,
        allUsedCoubons: resp.data.data.countUsedCoupons,
        allCoubons: resp.data.data.countAllCoupons,
        allCards: resp.data.data.countAllCards,
        allUsedCards: resp.data.data.countUsedCards,
      })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  getCounterVideo = async () => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/dashboard/counter/video',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allKoto: resp.data.data.countAllKotoVideos,
        allKotoWatche: resp.data.data.countWatchesKoto,
        allAdmob: resp.data.data.countWatchesAdmob,
        allUnity: resp.data.data.countWatchesUnity,
      })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getCounterCategory()
    this.getCounterGift()
    this.getCounterVideo()
  }
  render() {
    const {
      allUsers,
      allBlockedUser,
      allSurveys,
      allSurveySolved,
      allBills,
      allUsedBills,
      allCoubons,
      allUsedCoubons,
      allCards,
      allUsedCards,
      allKoto,
      allKotoWatche,
      allApp,
      allDownloadedApp,
      allAdmob,
      allUnity,
    } = this.state

    return (
      <div className="container pt-3">
        <div className="row">

          <div className="col-12  d-md-flex d-sm-block">

            <div className="col-sm-12 col-md-6 col-lg-3">

              <Cart
                cart="pink cart"
                cartIcon={<i className="fas fa-users"></i>}
                cartIconStyle=" cartIcon"
                title="  ?????? ???????????????????? "
                SubTitle={allUsers}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3  ">
              <Cart
                cart=" babybule  cart"
                cartIcon={<i className="fas fa-users-slash"></i>}
                title=" ?????? ?????????????????? "
                SubTitle={allBlockedUser}
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3 ">
              <Cart
                cart="  lightgreen cart"
                cartIcon={<i className="fas fa-poll"></i>}
                cartIconStyle=" cartIcon bg-success bg-gradient"
                title="?????? ?????????????????????? "
                SubTitle={allSurveys}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart=" lightred cart"
                cartIcon={<i className="fas fa-poll-h"></i>}
                title="  ?????????????????????? ???????????????? "
                SubTitle={allSurveySolved}
              />
            </div>
          </div>
          <div className="col-12  d-md-flex d-sm-block">
            <div className="col-sm-12 col-md-6 col-lg-3 ">
              <Cart
                cart=" lightblue cart"
                cartIcon={<i className="fas fa-file-invoice-dollar"></i>}
                title="?????? ????????????????"
                SubTitle={allBills}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart=" lightpurple cart"
                cartIcon={<i className="fas fa-file-invoice"></i>}
                cartIconStyle=" cartIcon bg-success bg-gradient"
                title=" ???????????????? ??????????????????   "
                SubTitle={allUsedBills}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart=" lightorang   cart"
                cartIcon={<i className="fas fa-sim-card"></i>}
                title="  ?????? ????????????"
                SubTitle={allCards}
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="lightblue cart"
                cartIcon={<i className="fas fa-sd-card"></i>}
                title="  ????????????  ??????????????????"
                SubTitle={allUsedCards}
              />
            </div>
          </div>
          <div className="col-12  d-md-flex d-sm-block">
            <div className="col-sm-12 col-md-6 col-lg-3 ">
              <Cart
                cart=" lightred cart"
                cartIcon={<i className="fas fa-money-check-alt"></i>}
                title=" ?????? ??????????????????    "
                SubTitle={allCoubons}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="lightgreen cart"
                cartIcon={<i className="fas fa-money-check"></i>}
                title=" 
                  ?????????????????? ??????????????????"
                SubTitle={allUsedCoubons}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="  pink cart"
                cartIcon={<i className="fas fa-photo-video"></i>}
                title=" ?????? ?????????????? koto"
                SubTitle={allKoto}
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="babybule cart"
                cartIcon={<i className="fas fa-file-video"></i>}
                title=" ?????????????? koto "
                SubTitle={allKotoWatche}
              />
            </div>
          </div>
          <div className="col-12  d-md-flex d-sm-block">
            <div className="col-sm-12 col-md-6 col-lg-3 ">
              <Cart
                cart=" babybule cart"
                cartIcon={<i className="fas fa-audio-description"></i>}
                title=" ??????????????  Admob    "
                SubTitle={allAdmob}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="lightorang cart"
                cartIcon={<i className="fas fa-film"></i>}
                cartIconStyle=" cartIcon bg-success bg-gradient"
                title=" 
                ?????????????? Unity"
                SubTitle={allUnity}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="lightpurple  cart"
                cartIcon={<i className="fab fa-adn"></i>}
                title=" ?????? ?????????????????? "
                SubTitle={allApp}
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="lightred cart"
                cartIcon={<i className="fas fa-download"></i>}
                title="   ?????????????????? ?????????????? "
                SubTitle={allDownloadedApp}
              />
            </div>
          </div>

          <div className=" col-12 d-md-flex d-sm-block justify-content-between mt-5">
            <div className="col-sm-12 col-md-12">
              <Card
                title="?????? ????????????????????"
                content={
                  <div className="px-3 py-3 ">
                    <div className="col-12 hader-chart bg-white">
                      <UserChart />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <div className=" col-12 d-md-flex d-sm-block justify-content-between mt-3">
            <div className="col-sm-12 col-md-4">
              <Card
                content={
                  <div className="p-1">
                    <div className="col-12 hader-chart bg-white ">
                      <BillChats />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <Card
                content={
                  <div className="p-1">
                    <div className="col-12 hader-chart bg-white ">
                      <ChargingChart />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <Card
                content={
                  <div className="p-1">
                    <div className="col-12 hader-chart bg-white ">
                      <ChargingChart2 />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <div className=" col-12 d-md-flex d-sm-block justify-content-between mt-3">
            <div className="col-sm-12 col-md-6  ">
              <Card
                title="????????????????"
                content={
                  <div className="px-3 py-3">
                    <div className="col-12 hader-chart bg-white cardHeight">
                      <VedioChart />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <Card
                title="??????????????????"
                content={
                  <div className="p-3">
                    <div className="col-12 hader-chart bg-white cardHeight">
                      <AppChart />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
