/* eslint-disable */
import { showAlert } from './alerts';

import axios from "axios";

export const createReview = async (data) => {
    try {
        const res = await axios.post('/api/v1/reviews', data);
        if (res.data.status === 'success') {
            showAlert('success', 'Review Added', 2);
            location.reload();
        }
    } catch (err) {
        showAlert('error', err.message, 2);
    }
};
