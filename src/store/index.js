import {createStore} from "vuex";
import { getToken, setToken, removeToken } from '@/utils/auth'


export  default createStore({
        state: {
            counter: 0
        },
        mutations:{
            add(state){
                state.counter++
            }
        },
       token: state => state.user.token,
    }
)
