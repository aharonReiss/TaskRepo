import React, { useEffect } from "react"
import authService from "../../../services/AuthService";
import { observer } from "mobx-react-lite";
import { userStore } from "../../../stores/UserStore";
import './UserDetails.css'
const UserDetails = observer(() => {
    const userData = userStore.userData;
    return (
        <div className="user-info-container">
            <div className="user-info-header">
                <h2>User Info</h2>
            </div>
            <div className="user-detail-container">
                <div className="user-detail">
                    <div className="user-info">Full Name:</div>
                    <div className="margin-right">{userData?.fullName}</div>
                    
                </div>
                <div className="user-detail">
                    <div className="user-info">Email Adress:</div>
                    <div className="margin-right">{userData?.emailAdress}</div>
                    
                </div>
                <div className="user-detail">
                    <div className="user-info">Telephone:</div>
                    <div className="margin-right">{userData?.telephone}</div>
                </div>
            </div>
        </div>
    )
})

export default UserDetails;