/* eslint-disable */
import { showAlert } from './alerts';

import axios from "axios";

export const updatePrescription = async (presId, data) => {
    try {
        const res = await axios.patch(`/api/v1/prescriptions/${presId}`, data);
        if (res.data.status === 'success') {
            showAlert('success', 'Prescription Saved');
            window.setTimeout(() => {
                location.reload();
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};


export const createPrescription = async (appointment, symptoms) => {
    try {
        const response = await axios.post('/api/v1/prescriptions', { appointment, symptoms });
        //console.log(response.data);
        if (response.data.status === 'success')
            window.location.assign(`/prescription/${response.data.data.data.id}`);
    } catch (err) {
        showAlert('error', err.message);
    }
};
