import React, { PureComponent } from "react";

{/*
    렌더링 중복을 방지해서 최적화 하는 방법 1
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter){
            return true;
        }
        return false;
    }
*/}

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,  
        array: [],
        object: {},   
    };

    

    onClick = () => {
        {/*이경우 array가 바뀌기 때문에 렌더링이 새롭게 되는 것이 맞다*/}
        this.setState({
            array: [...this.state.array, 1]
        });
    }

    render() {
        console.log('렌더링', this.state);
        return(
            <div>
                <button onClick = {this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;