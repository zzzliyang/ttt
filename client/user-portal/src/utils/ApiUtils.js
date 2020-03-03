import { API_BASE_URL, OK_CODE, API_DATE_FORMAT } from '../constants';
import axios from 'axios';

const request = (options) => {
    const headers = {'Content-Type': 'application/json'}

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return axios(options)
    .then(response => {
        if(!response.status === OK_CODE) {
            return Promise.reject(response.data);
        }
        return response.data;
    }
    )
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export function fetchNavikPnl(date) {
    const dateString = date.format(API_DATE_FORMAT);
    return request({
        url: API_BASE_URL + '/navikpnl?date=' + dateString,
        method: 'GET'
    });
}

export function fetchMlpPnl(date) {
    const dateString = date.format(API_DATE_FORMAT);
    return request({
        url: API_BASE_URL + '/mlppnl?date=' + dateString,
        method: 'GET'
    });
}

export function fetchAllPnlDate() {
    return request({
        url: API_BASE_URL + '/pnl/alldate',
        method: 'GET'
    });
}
