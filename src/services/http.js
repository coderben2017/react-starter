import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';

import { URLConfig } from '../utils/config'

const {commonUrl, businessUrl, oosUploadUrl, oosPreviewUrl} = URLConfig;


const formDataAuthLessHeaders = {
	'content-type': 'application/x-www-form-urlencoded'
};

const jsonAuthHeaders = {
	'Authorization': sessionStorage.getItem('token'),
	'content-type': 'application/json'
};

console.log(jsonAuthHeaders);


/**
 * 请求体数据转FormData格式
 * @param {Object} config http请求
 */
function dataToFormData (request) {
	request.data.schoolCode = sessionStorage.getItem('schoolCode');
	request.data = qs.stringify(request.data);
	return request;
}

/**
 * http响应成功处理
 * @param {Object} response http响应
 */
function successHandler (response) {
	if (response.data.code !== 0) {
		message.error(response.data.msg);
		return {data: null};
	}
	return response;
}

/**
 * http响应异常处理
 * @param {Error} error 异常
 */
function errorHandler (error) {
	message.error(error.message);
	return Promise.reject(error);
}


const login = axios.create({
  baseURL: commonUrl,
  headers: formDataAuthLessHeaders
});

const common = axios.create({
	baseURL: commonUrl,
	headers: jsonAuthHeaders
});

const business = axios.create({
	baseURL: businessUrl,
	headers: jsonAuthHeaders
});

const oosUoload = axios.create({
	baseURL: oosUploadUrl,
	headers: jsonAuthHeaders
});

const oosPreview = axios.create({
	baseURL: oosPreviewUrl,
	headers: jsonAuthHeaders
});


// 统一http请求处理
login.interceptors.request.use(dataToFormData, errorHandler);

// 统一http响应处理
login.interceptors.response.use(successHandler, errorHandler);
common.interceptors.response.use(successHandler, errorHandler);
business.interceptors.response.use(successHandler, errorHandler);
oosUoload.interceptors.response.use(successHandler, errorHandler);
oosPreview.interceptors.response.use(successHandler, errorHandler);


export const $login = login;
export const $common = common;
export const $business = business;
export const $oosUpload = oosUoload;
export const $oosPreview = oosPreview;