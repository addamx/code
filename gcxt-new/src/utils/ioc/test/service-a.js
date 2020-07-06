import { injectable, provide } from './index';
import {ServiceB} from './service-map';

@injectable()
@provide(ServiceB)
export default class ServiceA {
    getData() {
        const dict = this[ServiceB].getData;
        return Promise.resolve(dict.map(id => {
            return {id, text: `text-${id}`}
        }))
    }
};
