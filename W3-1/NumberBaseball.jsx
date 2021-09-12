import React, { PureComponent } from "react";
import Try from "./try";

function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1){
        const chosen = candidate.splice(Math.random()*(9-i), 1)[0];
        array.push(chosen);
    }
    return array;
};

class NumberBaseball extends PureComponent {
    state = {
        result: "",
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
        
    };
    
    onSubmitForm = (e) => {
        {/*prevState로 함수형 setState를 활용하면 왜 시도가 4개가 되는 걸까? */}
        e.preventDefault();
        if (this.state.value == this.state.answer.join('')){
            this.setState((prevState) => {
                return {
                    result : '홈런!',
                    tries: [...this.state.tries, {try: this.state.value, result:'홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                this.setState({
                    result: `10회 이상 틀렸으므로 실패입니다. 답은 ${this.state.answer.join(",")}입니다.`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i += 1){
                    if (answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                    this.setState((prevState) => {
                        return {
                            tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼입니다.`}],
                            value: '',
                        }
                    });
                }
            }
        };

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
                    {this.state.tries.map((v, i)=> {
                        return (
                            <Try key = {`${i+1}차시도`} tryInfo = {v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball; // import로 불러서 쓰기