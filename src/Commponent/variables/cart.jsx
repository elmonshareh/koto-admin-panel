import React, { Component } from 'react';
class Cart extends Component {

    state = {  }
    render() { 
        return ( <div className={"cart"}  >
            <div className="cart-hader d-flex">
            <div className="text-start"> 
             <h3 > { this.props.title}</h3>
             <p> { this.props.SubTitle}</p></div>
             <div className="cartIcon " >{this.props.cartIcon}</div>
             
             
            
            </div>
            <div className="cart-footer">
                <div className="cart-state"> {this.props.cartState}</div>
            </div>
        </div> );
    }
}
 
export default Cart;