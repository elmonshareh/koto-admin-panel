import React, { Component } from 'react'
import img from '../Img/sad.svg'
class PageNotFound extends Component {
  state = {}
  render() {
    return (
      <div className="d-flex justify-content-center  text-center ">
        <div>
          {' '}
          <div>
            {' '}
            <img src={img} width="250" className="my-5" />
          </div>{' '}
          <h2> لقد حدث خطأ في التطبيق</h2>
        </div>
      </div>
    )
  }
}

export default PageNotFound
