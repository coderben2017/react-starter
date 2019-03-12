import qs from 'qs';
import axios from 'axios';
import { message } from 'antd';
import { URLConfig } from '../utils/config'

/**
 * 请求体数据转FormData格式
 * @param {Object} request http请求
 */
function dataToFormDataWithSchoolCode (request) {
	request.data = Object.assign({}, request.data, {
		schoolCode: sessionStorage.getItem('schoolCode')
	});
	request.data = qs.stringify(request.data);
	return request;
}

/**
 * http响应成功处理
 * @param {Object} response http响应
 */
function successHandler (response) {
	if (response.data.data && response.data.code !== 0) {
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

const {commonUrl, businessUrl, oosUploadUrl, oosPreviewUrl} = URLConfig;
const formDataAuthLessHeaders = {
	'content-type': 'application/x-www-form-urlencoded'
};

const common = axios.create({
	baseURL: commonUrl,
	headers: formDataAuthLessHeaders
});

const business = axios.create({
	baseURL: businessUrl,
	headers: formDataAuthLessHeaders
});

const oosUoload = axios.create({
	baseURL: oosUploadUrl,
	headers: formDataAuthLessHeaders
});

const oosPreview = axios.create({
	baseURL: oosPreviewUrl,
	headers: formDataAuthLessHeaders
});


// 统一http请求处理
common.interceptors.request.use(dataToFormDataWithSchoolCode, errorHandler);

// 统一http响应处理
common.interceptors.response.use(successHandler, errorHandler);
business.interceptors.response.use(successHandler, errorHandler);
oosUoload.interceptors.response.use(successHandler, errorHandler);
oosPreview.interceptors.response.use(successHandler, errorHandler);

export const $common = common;
export const $business = business;
export const $oosUpload = oosUoload;
export const $oosPreview = oosPreview;
