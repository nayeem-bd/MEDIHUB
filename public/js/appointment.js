/* eslint-disable */
import { showAlert } from './alerts';

import axios from "axios";

export const bookAppointment = async (doctor, user, date, schedule, fee, symptoms) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/appointments/',
            data: {
                doctor, user, date, schedule, fee, symptoms
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Appointment booked successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const updateAppointment = async(appointmentId)=>{
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/appointments/${appointmentId}`,
            data: {
                isPaid:true
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Paid');
            window.setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}
