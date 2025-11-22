import { storeProduct } from '../models/store.model.js';
import {Server} from 'socket.io'


class SocketService {
    private _io: Server;

    constructor(){
        console.log("soc server run")
        this._io = new Server()
    }

    public initListener() {
        const io = this.io
        console.log("ini listener")
        io.on('connect' , socket => {
            console.log("new socket connected" , socket.id)

            socket.on("update product" , async ({product} : {product: storeProduct}) => {
                console.log('product added' , product)
            })
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService