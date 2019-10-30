import React, { Component } from 'react';
import { connect } from 'react-redux';
import Doctor from '../components/Doctor';
import { getCurrentUser } from '../actions/currentUser'

class DoctorList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: false,
            userDocs: this.props.userDoctors
        }
    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    // userDoctors = () => (
    //     this.props.currentUser.doctors.map(doctor => {
            
    //         let userDoc = this.props.doctors.find(doc => (
    //             doc.uid === doctor.uid
    //         ))
    //     userDoc.id = doctor.id 
    //     userDoc.user_note = doctor.user_note
    //     return userDoc
            
    //     })

    // )

    // ownsDoctor = (doctor) => {
         
    //     let result = this.props.currentUser.doctors.find(doc => doctor.uid === doc.uid)
    //     return result ? true : false
    // }
    
    // allDoctors = () => (
    //     this.props.doctors.map(doctor => {
    //         if (this.ownsDoctor(doctor)) {
    //             let doc = this.props.currentUser.doctors.find(dr => dr.uid === doctor.uid)
    //             doctor.user_note = doc.user_note
    //             return doctor
    //         } else {
    //             return doctor
    //         }
    //     })
    // )



    listDoctors = (doctors) => (
        doctors.map(doctor => 
            <li key={doctor.uid}>Dr. {doctor.profile.last_name} <button value={doctor.uid} onClick={this.handleClick}>give me the news!</button></li>
        )
    )

    listUserDoctors = (doctors) => (
        doctors.map(doctor => 
            <li key={doctor.uid}>Dr. {doctor.profile.last_name} <button value={doctor.uid} onClick={this.handleClick}>give me the news!</button><button value={doctor.id} onClick={this.handleDelete}>remove</button></li>
        )
    )

    handleDelete = (event) => {
        const id = parseInt(event.target.value)
        const updatedDocs = this.state.userDocs.filter(doc => (
                doc.id !== id
            ))
        this.setState({
            userDocs: updatedDocs
        })
        fetch(`http://localhost:3000/api/v1/doctors/${id}`, {
            credentials: "include",
            method: "DELETE"
        })        
    }

    handleClick = event => {
        let doctorUid = event.target.value;
        let doctor = this.props.doctors.find(doctor => doctorUid === doctor.uid )
        this.setState({
            selectedDoctor: doctor
        })
        
    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="doctorContainerList">
                    {/* {this.props.doctors !== null && this.props.currentUser !== null ? */}
                        {this.props.userDoctors ? 
                            this.listUserDoctors(this.state.userDocs)
                        : 
                            this.listDoctors(this.props.allDoctors)}
                        {/* :
                            'still loading...'} */}
                    </div>
                </div>
                <div className="column">
                    <div className="doctorContainerCard">
                        {this.state.selectedDoctor ? <Doctor key={this.state.selectedDoctor.uid} note={this.state.selectedDoctor.user_note} doctor={this.state.selectedDoctor}/> : 'Select a Doctor'}
                    </div>
                </div>              
            </div>
        )
    }
}

const mapStateToProps = ({currentUser, doctors}) => {
    return {
        currentUser,
        doctors
    }
}

export default connect(mapStateToProps, {getCurrentUser})(DoctorList);

