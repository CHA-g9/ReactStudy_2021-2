import React, {useState, useRef} from "react";

const ResponseCheck = () => {
    const [state, useState] = useState('waiting');
    const [message, useMessage] = useState('클릭해서 시작하세요!');
    const [result, useResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === "waiting") { 
            setState("ready");
            setMessage("초록색이 보이면 클릭!");
            
            startTime.current = new Date();
            timeout.current = setTimeout(()=> {
                setState("now");
                setMessage("지금 클릭!");
            }, Math.floor(Math.random()*1000)+2000);
        } else if (state === "ready") {
            {/*성급한 클릭*/}
            clearTimeout(timeout.current);
            setState("waiting");
            setMessage("이런, 성급한 클릭이었군요! 초록색에서 클릭하세요!");

        } else if (state == "now") {
            {/*반응 속도 체크*/}
            endTime.current = new Date();
            setState("waiting");
            setMessage("클릭해서 시작하세요!");
            setResult((prevResult) => { return [...prevResult, endTime.current - startTime.current] });
        }

    };

    const renderAverage = () => {
        return result.length === 0 
        ? null 
        :
        <>
            <div>평균 반응 시간 : {result.reduce((a,c) => a+c)/result.length}ms</div>
            <button onClick = {onReset}> Reset</button>
        </>

    };

    const onReset = () => {
        setResult([]);
    };

    return (
            <>
                <div id="screen" className={state} onClick = {onClickScreen}>
                    {message}
                </div>
                <div>{renderAverage()}</div>
                {/* 즉시 실행 방식으로 리턴 내에 조건문 쓰기*/}
                {(() => {
                    if (result.length == 0) {
                        return null;
                    } else {
                        return <>
                        <div>평균 반응 시간 : {result.reduce((a,c) => a+c)/result.length}ms</div>
                        <button onClick = {onReset}> Reset</button>
                        </>
                    }
                })()}
                {/* 즉시 실행 방식으로 리턴 내에 반복문 쓰기*/}
                {(() => {
                    const array = [];
                    for (let i = 0; i < TimeRanges.length; i++){
                        array.push(<Try key = {`${i+1}차 시도 : ${v.try}`} tryInfo = {v} />)
                    }
                    return array;
                }) ()}
                {/*JSX에서 배열 리턴하기*/}
                return [
                    <div key = "사과">사과</div>
                    <div key = "사과">사과</div>
                    <div key = "사과">사과</div>
                    <div key = "사과">사과</div>
                    <div key = "사과">사과</div>
                    <div key = "사과">사과</div>
                ]
                
            </>

        );

    }
}

export default ResponseCheck;