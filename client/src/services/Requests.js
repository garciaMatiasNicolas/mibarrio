import axios from "axios";

const postData = async (url, body, headers = {}) => {
    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const putData = async (url, body, headers = {}) => {
    try {
        const response = await axios.put(url, body, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getData = async (url, headers = {}) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteData = async (url, headers = {}) => {
    try {
        const response = await axios.delete(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { postData, putData, getData, deleteData };

