import React, { Component } from "react";
import './Game.css';
import emptyLike from "../assets/emptyLike.png";
import like from "../assets/like.png";
import Unity, { UnityContext } from "react-unity-webgl";

export default class FootballJumper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: 0,
            isLiked: false,
        }
        this.handleClickLike = this.handleClickLike.bind(this);

        this.unityContext = new UnityContext({
            loaderUrl: "./FJ/Build/FJ.loader.js",
            dataUrl: "./FJ/Build/FJ.data",
            frameworkUrl: "./FJ/Build/FJ.framework.js",
            codeUrl: "./FJ/Build/FJ.wasm",
          });
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
                <section className="game-section">
                    <Unity 
                        unityContext={this.unityContext}
                        style={{
                            width: 640,
                            height: 440,
                            border: "2px solid black",
                            backrgound: "grey"
                        }} />
                {/*<iframe src="https://itch.io/embed/1447725" height="167" width="552" frameborder="0"><a href="https://hotmailnico.itch.io/footballjumper">Football Jumper by Hotmailnico</a></iframe>*/}
                    {/*<iframe id='webgl_iframe' frameborder="0" allow="autoplay; fullscreen; vr" allowfullscreen="" allowvr=""
                        mozallowfullscreen="true" src="https://play.unity3dusercontent.com/webgl/876757b3-c4e8-4747-b6b3-b59870d96911?screenshot=false&embedType=embed"  width="810"
                        height="640" onmousewheel="" webkitallowfullscreen="true"></iframe>*/}
                </section>
                <div>
                    <img alt='Like' onClick={this.handleClickLike} className="img-like" src={(this.state.isLiked) ? like : emptyLike}></img>
                    <div>{this.state.like}</div>
                </div>
            </>
        )
    }
}