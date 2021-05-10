import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import DoughnutChart from './../Charts/chartsLiner'
import { Card } from './../login/Card'
import vvv from "../../Img/mov_bbb.mp4"
class AddApp extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [] ,
      video:"", selectedFile: null,}
  }
   uploadVedio= async(e)=>{
    await  this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  //
  //  let  vedio=e.target.files[0]
   let src=URL.createObjectURL(this.state.selectedFile)
   console.log (this.state.selectedFile)
   console.log( src)
   this.setState({video:src})
   }
  render() {
    const { vedio } = this.state;
    console.log(this.state.video)
    return (
      <div>
        <Card
          content={
            <div className="container">
              <div className="d-flex row m-3 text-right">
                <div className="col-md-4 col-sm-12">
                  <div className="d-flex my-3">
                  
                    <span className="addAds">عنوان الاعلان:</span>
                    <input type="text" className="w-75"maxLength="50" />
                  </div>
                  <div className="d-flex">
                    <span className="addAds pl-2">نص الاعلان :</span>
                    <textarea type="textarea" className="w-75"maxLength="50" />
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds">تاريخ الانتهاء:</span>
                    <input type="date" className="w-75"/>
                  </div>
                </div>
                <div class="file-input my-3 col-md-4 col-sm-12">
                  
                  <div className="my-3">
                  <input
                    type="file"
                    id="file"
                    className="file my-3"
                    accept="video/*"
                    value={this.state.vedio}
                    onChange={this.uploadVedio}
                  />
                  <label for="file">
                    تحميل الفيديو
                    <p className="file-name"></p>
                  </label>
                  </div>
                  <input
                    type="submit"
                    className="submitadd"
                    
                  />
                </div>
                <div className="col-md-4 col-sm-12">
                <video src={this.state.video} autoPlay="true" controls="controls"  width="100%"/>
                </div>
              </div>
              <div className="py-5 px-3">
                <Table
                  striped
                  hover
                  className=" border table-success table-striped"
                >
                  <thead className="tdCatergory">
                    <tr>
                      <th> عنوان الرساله</th>
                      <th> نص الرساله</th>
                    </tr>
                  </thead>
                  <tbody className="trCatergory">
                    <tr>
                      <td>mm</td>
                      <td>mmm</td>
                    </tr>
                    <tr>
                      <td>mm</td>
                      <td>mmm</td>
                    </tr>
                    {/* {this.state.items.map((item) => {

                                return (
                                    <tr key={item.id}>
                                        <td>mm</td>
                                        <td>mmm</td>

                                    </tr>
                                );
                            })} */}
                  </tbody>
                </Table>
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

export default AddApp
