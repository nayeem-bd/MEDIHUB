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
