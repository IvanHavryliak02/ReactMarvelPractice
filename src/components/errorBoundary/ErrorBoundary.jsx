import { Component } from "react";

export default class ErrorBoundary extends Component{
    state = {
        error: false
    }

    componentDidCatch = (error, errorLog) => {
        console.error(error, errorLog)
        this.setState({
            error: true
        })
    }

    render() {
        return this.state.error ? <h1>Something went wrong</h1> : this.props.children;
        
    }
}