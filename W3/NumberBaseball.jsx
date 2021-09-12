import React, { Component } from "react";

function getNumbers() {

};

class NumberBaseball extends Component {
    state = {
        result: "",
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onChangeInput = (e) => {
        
    };

    onSubmitform = () => {

    };

    render() {
        return (
            <>
                <h1>{this.state.value}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {[['사과','빨강'],
                    ['바나나', '노랑'],
                    ['포도','보라'], 
                    ['블루베리', '파랑']].map((v)=> {
                        return (
                            <li>{v[0]} - {v[1]}</li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball; // import로 불러서 쓰기