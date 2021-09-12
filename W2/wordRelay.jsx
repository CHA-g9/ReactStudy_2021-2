const React = require('react');
const { Module } = require('webpack');

// 클래스 분리할 때 쓰이는 친구들을 꼭 불러와야한다.
const { Component } = React;

// 윗 부분이 쪼갠 패키지나 라이브러리 가져오는 부분

class wordRelay extends React.Component {
    state = {
        text: "hello, WEBPACK!",
    };
    render() {
        return <h1>{this.state.text}</h1>
    }
}

module.exports = wordRelay;
// 파일을 쪼갤 땐 이 친구도 꼭 적어야한다!
// 내가 쪼갠 파일에서 쓰는 컴포넌트를 바깥에서도 쓸 수 있게 해주는 것
// 노드의 모듈 시스템!!
