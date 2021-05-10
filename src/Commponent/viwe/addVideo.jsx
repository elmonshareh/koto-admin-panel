import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Card } from './../login/Card'
class AddVideo extends Component {
  state = { items:[]}
  render() {
    return (
      <div>
   
        <Card
          content={
            <div>
       
              <Table striped hover className="table">
                <thead className="tdCatergory">
                  <tr>
                    <th> عنوان الرساله</th>
                    <th> نص الرساله</th>
                  </tr>
                </thead>
                <tbody className="trCatergory">
                  {this.state.items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>lll</td>
                        <td>kk</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          }
        />
      </div>
    )
  }
}

export default AddVideo
