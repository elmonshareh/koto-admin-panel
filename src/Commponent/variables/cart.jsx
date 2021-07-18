import React, { Component } from 'react'
class Cart extends Component {
  state = {}
  render() {
    return (
      <div className={this.props.cart} >
        <div className="cart-hader ">
          <div className="">
            <h4 className="text-center text-nowrap my-3"> {this.props.title}</h4>
            <h5 className="text-center my-3"> {this.props.SubTitle} {this.props.cartIcon}</h5>
          </div>
          
        </div>
       
      </div>
    )
  }
}

export default Cart
