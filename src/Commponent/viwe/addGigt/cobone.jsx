import React, { Component } from 'react';
import Card from '../../login/Card';
import { SketchPicker } from 'react-color';
class Cobone extends Component {
    state = {  date: new Date().toISOString().split('T')[0],
    type: 'اختر النوع',
    discount: '',
    points: '',
    name: '',
    disCode:"",
    background: 'rgba(52, 52, 52, 0.8)',
    backgroundHex: 'linear-gradient(40deg,rgb(140 124 247), #86e2de)',
    showHide: false,
    showHideBtn: true,
    colorarry: [],
    colorarryHex: [] }
    handleChangeComplete = async (color, event) => {
        const { colorarry, background, colorarryHex} = this.state
    
        if (colorarryHex.length === 2) {
        } else {
          colorarryHex.push(color.hex)
        }
        this.setState({
          background: color.rgb,
          backgroundHex: colorarryHex[0],
          colorarryHex,showHide: !this.state.showHide,
          showHideBtn: !this.state.showHideBtn,
          
        })
        if (background === '') {
          console.log('emty')
        } else {
          if (colorarry.length === 2) {
          } else {
            colorarry.push(background)
          }
        }
    
        console.log(colorarryHex)
      }
      hideComponent = () => {
        this.setState({
          showHide: !this.state.showHideDemo1,
          showHideBtn: !this.state.showHideBtn,
        })
      }
      removecolor = (key) => {
        var { colorarryHex } = this.state
        colorarryHex.splice(key, 1)
        colorarryHex.length===1&&this.setState({backgroundHex:colorarryHex[0]})
        colorarryHex.length===0&& this.setState({backgroundHex:"linear-gradient(40deg,rgb(140 124 247), #86e2de)"})            
        this.setState({ colorarryHex: colorarryHex })
      }
    render() { 
        const {
            date,
            name,
            discount,
            points,
            background,
            showHide,
            showHideBtn,
            backgroundHex,
            colorarryHex,
            disCode
          } = this.state
          const mycolor = {
            background:
             ( colorarryHex.length === 1 ||colorarryHex.length === 0 )
                ? `${backgroundHex}`
                : `linear-gradient(40deg, ${colorarryHex[0]},${colorarryHex[1]})`, color:"white"
          }
        return (  <div>
            <Card
              title="اضافه كوبون خصم"
              content={
                <div className="container text-right ">
                  <div className="row mt-3 mb-3">
                    <div className="col-md-6 col-sm-12">
                      <div className="d-md-flex my-3  d-block">
                        <div className="addAds text-nowrap ">
                          الاسم :
                        </div>
                        <input
                          className="p-1 inputCrat"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(event) =>
                            this.setState({ name: event.target.value })
                          }
                        />
                      </div>
                      <div className="d-md-flex my-3  d-block">
                        <div className="addAds text-nowrap">
                          قيمه الخصم :
                        </div>
                        <input
                          className="p-1 inputCrat "
                          type="number"
                          id="discount"
                          name="discount"
                          value={discount}
                          onChange={(event) =>
                            this.setState({ discount: event.target.value })
                          }
                        />
                      </div>
                      <div className="d-md-flex my-3  d-block">
                        <div className="addAds text-nowrap">
                          كود الخصم  :
                        </div>
                        <input
                          className="p-1  inputCrat "
                          type="number"
                          id="disCode"
                          name="disCode"
                          value={disCode}
                          onChange={(event)=>this.setState({disCode:event.target.value})}
                        />
                      </div>
                      <div className="d-md-flex my-3  d-block">
                        <div className="addAds text-nowrap ">
                          قيمه النقاط :
                        </div>
                        <input
                          className="p-1 inputCrat "
                          type="number"
                          id="point"
                          name="point"
                          value={points}
                          onChange={(e) =>
                            this.setState({ points: e.target.value })
                          }
                        />
                      </div>
                      <div className="d-md-flex my-3  d-block">
                        <label className="addAds text-nowrap ">تاريخ الانتهاء :</label>
                        <input
                          type="date"
                          id="start"
                          name="date"
                          className="inputCrat px-2 p-1"
                          value={date}
                          min={new Date().toISOString().split('T')[0]}
                          max="2022-12-31"
                          onChange={(event) =>
                            this.setState({ date: event.target.value })
                          }
                        />
                      </div>
                      <div className="d-md-flex my-3  d-block">
                        <label className="text-nowrap addAds"> لون الخلفيه:</label>
    
                        {showHide && (
                          <div className="d-md-flex d-sm-block">
                        <div className="col-sm-12 col-md-8">
                              <SketchPicker
                                color={background}
                                onChangeComplete={this.handleChangeComplete}
                                width="100%"
                                height="100%"
                              />
                            </div>
                            <div className="d-flex d-md-block">
                              {colorarryHex[0] && (
                                <div className="d-flex ">
                                  <div
                                    className="mr-4 mt-3"
                                    style={{
                                      background: `${colorarryHex[0]}`,
                                      height: '46px',
                                      width: '38px',
                                    }}
                                  ></div>
                                  <div className="error"  onClick={() =>
                                      this.removecolor(colorarryHex[1])
                                    }>  <i className="fas fa-minus-circle pt-3 mt-3 mx-2"></i></div>  
                                </div>
                              ) }
    
                              {colorarryHex[1] && (
                                <div className="d-flex">
                               
                                  <div
                                    className="mr-4 mt-3"
                                    style={{
                                      background: `${colorarryHex[1]}`,
                                      height: '46px',
                                      width: '38px',
                                    }}
                                  >
                                    
                                  </div>
                               <div className="error"  onClick={() =>
                                      this.removecolor(colorarryHex[0])
                                    }>  <i className="fas fa-minus-circle pt-3 mt-3 mx-2"></i></div>  
                                 
                                </div>
                              ) }
                            </div>
                          </div>
                        )}
                        {showHideBtn && (
                          <button
                            className="btnColor border border-light rounded-pill p-2"
                            onClick={() => this.hideComponent()}
                          >
                            اضغط لي اختيار اللون
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="shape mb-3 p-3  mt-3" style={mycolor}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5>كود كوبون  </h5>
                          </div>
                          <h3> {discount}%</h3>
                        </div>
                        <h6 className="d-flex">خصم {name}</h6>
                        <div className="text-center">{disCode}</div>
                        <hr className="new2" />
                        <h5 className="pointPostionCart mb-3">
                          تبديل ب {points} نقطه
                        </h5>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <button onClick={this.addNewItem} className="addQuestion w-75" >
                          اضافه الكوبون
                        </button>
                      
                      </div>            
                    </div>
                  </div>
                </div>
              }
            />
          </div> );
    }
}
 
export default Cobone;