import ioc from '../index';

const appIoc = new ioc();
export default appIoc;

const { injectable, provide } = appIoc;
export const injectable = injectable.bind(appIoc);
export const provide = provide.bind(appIoc);