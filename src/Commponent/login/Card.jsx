import React, { Component } from "react";

export class Card extends Component {
    render() {
        return (
            <div className="card"  > 
                <h4 className="d-flex   justify-content-md-start  justify-content-center mx-4 mt-3 text-nowrap">  {this.props.title}</h4>
                <div
                    className="content"
                >
                    {this.props.content}
                </div>
            </div >
        );
    }
}

export default Card;