import React, { Component } from "react";

export class Card extends Component {
    render() {
        return (
            <div className={"card"} >

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