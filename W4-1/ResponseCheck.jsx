import React, { Component } from "react";

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요!',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state, message, result} = this.state;
        if (state === "waiting") { 
            this.setState({
                state: "ready",
                message: "초록색이 보이면 클릭!"
            });
            this.startTime = new Date();
            this.timeout = setTimeout(()=> {
                this.setState({
                    state: "now",
                    message: "지금 클릭!"
                })
            }, Math.floor(Math.random()*1000)+2000);
        } else if (state === "ready") {
            {/*성급한 클릭*/}
            clearTimeout(this.timeout);
            this.setState({
                state: "waiting",
                message: "이런, 성급한 클릭이었군요! 초록색에서 클릭하세요!",
            });

        } else if (state == "now") {
            {/*반응 속도 체크*/}
            this.endTime = new Date();
            this.setState((prevState) => { 
                return {
                state: "waiting",
                message: "클릭해서 시작하세요!",
                result: [...prevState.result, this.endTime - this.startTime],
                };
            });

        }

    };

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0 
        ? null 
        :
        <>
            <div>평균 반응 시간 : {result.reduce((a,c) => a+c)/result.length}ms</div>
            <button onClick = {this.onReset}> Reset</button>
        </>

    };

    onReset = () => {
        this.setState({
            result: [],
        });
    };

    render () {
        return (
            <>
                <div id="screen" className={this.state.state} onClick = {this.onClickScreen}>
                    {this.state.message}
                </div>
                <div>{this.renderAverage()}</div>
                
            </>

        );

    }
}

export default ResponseCheck;