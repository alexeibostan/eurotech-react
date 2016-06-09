/**
 * Created by alexei on 27/05/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    getDevices: (devices) => {
        AppDistpatcher.dispatch({
            actionType: 'DEVICES_GET',
            devices: devices
        });
    },
    getDevicesPage:(devicePageNumber) => {
        AppDistpatcher.dispatch({
            actionType: 'PAGES_GET',
            devicePageNumber: devicePageNumber
        });
    },
    changeDeviceCurrentPage:(deviceCurrentPage) => {
        AppDistpatcher.dispatch({
            actionType: 'PAGE_CHANGE',
            deviceCurrentPage: deviceCurrentPage
        });
    }
}