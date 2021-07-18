import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios'
import SpinnerChart from './../../variables/spinnerCharts';
class SolvedSurveryUses extends Component {
    state = {filter: [],
      key: 1,
      keypagnation: 10,
        disablepre: true,
        token: localStorage.getItem('token'), allUsers:[],
        max_id: '',
        min_id: '',
        disablepre: true,
        disablenext: false,
        styleNext: '',
        stylePre: '#6b18ff80',
        show: false,
        allSurvey:[]
      }
        redirect = (item) => {

          this.props.history.push(`/admin/AddADS/SolvedServayDetailes${item.user._id}/${this.props.match.params.id}`)
        }
        getSurveyUsers= async () => {
          this.setState({ isLoading:true})
          try {
            const { token } = this.state
            const resp = await axios({
              method: 'get',
              url: `https://koto2020.herokuapp.com/api/survey/users/${this.props.match.params.id}?size=10`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          
            await this.setState({
              allSurvey: resp.data.users.data,
              max_id:  resp.data.users.paging.cursors.max_id,
              min_id:  resp.data.users.paging.cursors.min_id,
              isLoading:false
            })
            if (!resp.data.users.paging.hasNext) {
              this.setState({
                disablenext: true,
                styleNext: '#6b18ff80',
              })}
          } catch (err) {
            this.props.history.push(`/404`)
          }
        }
        next = async () => {
         
          const { token, max_id, key, keypagnation } = this.state
      
          this.setState({ isLoading: true })
          try {
            await this.setState({ keypagnation: keypagnation + 10, key: key + 1 })
            const resp = await axios({
              method: 'get',
              url: `https://koto2020.herokuapp.com/api/survey/users/${this.props.match.params.id}?max_id=${max_id}&size=10`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            await this.setState({
              allSurvey: resp.data.users.data,
              max_id:  resp.data.users.paging.cursors.max_id,
              min_id:  resp.data.users.paging.cursors.min_id,
              isLoading:false
            })
            if (!resp.data.users.paging.hasNext) {
              this.setState({
                disablenext: true,
                styleNext: '#6b18ff80',
                disablepre: false,
                stylePre: '#6b18ff',
              })
            } else {
              this.setState({
                disablenext: false,
                disablepre: false,
                stylePre: '#6b18ff',
              })
            }
          } catch (err) {
            this.props.history.push(`/404`)
          }
        }
        pre = async () => {
          const { key, keypagnation, token, min_id } = this.state
          this.setState({ isLoading: true })
          try {
            await this.setState({ keypagnation: keypagnation - 10, key: key - 10})
            const resp = await axios({
              method: 'get',
              url: `https://koto2020.herokuapp.com/api/survey/users/${this.props.match.params.id}?min_id=${min_id}&size=10`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
           
            await this.setState({
              allSurvey:resp.data.users.data,
              max_id:  resp.data.users.paging.cursors.max_id,
              min_id:  resp.data.users.paging.cursors.min_id,
              isLoading:false
            })
            if (!resp.data.users.paging.hasPrevious) {
              this.setState({
                disablepre: true,
                disablenext: false,
                styleNext: '#6b18ff',
                stylePre: '#6b18ff80',
              })
            } else {
              this.setState({
                disablepre: false,
                disablenext: false,
                styleNext: '#6b18ff',
              })
            }
          } catch (err) {
            this.props.history.push(`/404`)
          }
        }
        componentDidMount(){this.getSurveyUsers()}
    render() { 

        const { allSurvey, filter, keypagnation, isLoading,styleNext,
          disablenext,
          disablepre,
          key,
          stylePre,} = this.state
        return ( <div>
            <div className="py-5 px-3 mt-3 border rounded bg-light ">
              {/* <div className="d-flex mb-3 ">
                <label>البحث :</label>{' '}
                <input
                  type="text"
                  className="filter mr-2 p-1"
                  vaule={filter}
                  onChange={this.handleChange}
                />
              </div> */}
               <h3 className="d-flex mb-4">  المستخدمين</h3>
              <Table
            striped
            hover
            bordered
            className="table text-nowrap table-light"
            responsive
          >
            <thead className="tdCatergory">
              <tr className="text-center">
                <td> كود</td>
            
               <td> الاسم</td>
                <th> تاريخ الاجابه </th>
            
                <th> التفاصيل </th>
              
              </tr>
            </thead>
            <tbody className="trCatergory text-center ">
            {isLoading ? 
              <tr>
            
              <td colspan="6" > <div className="d-flex justify-content-center uerSpiner ">
            <SpinnerChart />
          </div></td>
             
                </tr>
             : allSurvey.map((item) => {
        
              return ( 
                <tr key={item._id}>
                  <td>{item._id}</td>
                <td>{item.user.firstName}{item.user.lastName}</td>
                  <td> {item.createdAt}</td>
                  <td
                    onClick={() => {
                      this.redirect(item)
                    }}
                  >
                    <i className="far fa-eye"></i>
                  </td>
                  
                </tr>
              )
            }) }
       
      </tbody>
          </Table>
              <div className="d-flex justify-content-between px-5 pb-4 mt-3">
              <button
              onClick={this.next}
              className="pgnationbtn"
              disabled={disablenext}
              style={{ background: styleNext }}
            >
              التالي{' '}
            </button>

            <p className="text-nowrap px-2">
            من{key} الي {keypagnation }{' '}
            </p>
            <button
              className="pgnationbtn "
              onClick={this.pre}
              disabled={disablepre}
              style={{ background: stylePre }}
            >
              السابق
            </button>
              </div>
            </div>{' '}
          </div>  );
    }
}
 
export default SolvedSurveryUses;