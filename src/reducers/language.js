import { CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions';
import {parseConstants, parseFunctions, parsePredicates} from '@fmfi-uk-1-ain-412/js-fol-parser';


const language = (state = { consts: { input: "", object: new Set(), error: ""}, funs: { input: "", object: new Map(), error: "" }, preds: { input: "", object: new Map(), error: "" }}, action = {type: undefined}) => {
    switch (action.type) {
        case CHANGE_CONST:
            let consts = {...state.consts, input: action.text, error: ""};
            try {
                consts.object = new Set(parseConstants(action.text));
            } catch (e) {
                consts.error = e;
            }
            return {...state, consts};

        case CHANGE_FUN:
            let funs = {...state.funs, input: action.text, error: ""};
            try {
                funs.object = new Map(parseFunctions(action.text).map(obj => [obj.name, obj.arity]));
            } catch (e) {
                funs.error = e;
            }
            return {...state, funs};

        case CHANGE_PRED:
            let preds = {...state.preds, input: action.text, error: ""};
            try {
                preds.object = new Map(parseFunctions(action.text).map(obj => [obj.name, obj.arity]));
            } catch (e) {
                preds.error = e;
            }
            return {...state, preds};

        default:
            return state
    }
}

export default language;