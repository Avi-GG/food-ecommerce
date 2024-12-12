import React from "react";

//example of class based component
class UserClass extends React.Component {

    //to get the props
    constructor(props){
        super(props);

        this.state = {
            count: 0,
        };
        
    }

    async componentDidMount(){ //similar to useEffect hook // happends after mounting thats why use "did"
        console.log("Component Mounted");
        const data = await fetch("https://api.github.com/users/Avi-GG");
        const json = await data.json();

    }

    componentDidUpdate(){ // similar to useEffect hook's dependencies array
        console.log("Component Updated");
    }

    componentWillUnmount(){ // similar to useEffect hook's cleanup(return in useEffect) function  // happends before unmounting thats why use "will"
        console.log("Component Unmounted");
    }

    render() {
        const {count} = this.state;

        return (
            <div className='user-card'>
                <h1>Count - {count}</h1>
                <button onClick={() => this.setState({count: count + 1})}>Increment</button>
                <h2>Name - {this.props.name}</h2>
                <h5>Location - Muzaffarnagar</h5>
                <p>Contact - heyitsyoavi@gmail.com</p>
      
            </div>
        );
    }
}

export default UserClass;