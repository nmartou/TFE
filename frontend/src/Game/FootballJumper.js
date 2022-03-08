import React, { Component } from "react";
import './Game.css';
import emptyLike from "../assets/emptyLike.png";
import like from "../assets/like.png";

export default class FootballJumper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: 0,
            isLiked: false,
        }
        this.handleClickLike = this.handleClickLike.bind(this);
    }

    handleClickLike() {
        let isLiked = this.state.isLiked
        let like = this.state.like + (isLiked ? -1 : 1 );
        this.setState({like: like, isLiked: !isLiked});
    }

    render() {
        return(
            <>
                <p>Hello there</p>
                <div>
                        <img onClick={this.handleClickLike} className="img-like" src={(this.state.isLiked) ? like : emptyLike}></img>
                    <div>{this.state.like}</div>
                </div>
            </>
        )
    }
}