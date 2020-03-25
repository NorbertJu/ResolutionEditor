import { CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions';
import {parseConstants, parseFunctions, parsePredicates} from '@fmfi-uk-1-ain-412/js-fol-parser';

const language = (state = { const: { input: "", object: new Set(), error: ""}, fun: { input: "", object: new Map(), error: "" }, pred: { input: "", object: new Map(), error: "" } }, action = {type: undefined}) => {
    switch (action.type) {
        case CHANGE_CONST:
            let newState = {
                const: {
                    input: action.text,
                    object: state.const.object,
                    error: state.const.error
                },
                fun: state.fun,
                pred: state.pred
            }
            try {
                let res = undefined;
                if (action.text !== "") {
                    res = parseConstants(action.text); 
                }
                newState.const.object = new Set(res);
                newState.const.error = "";
            } catch (e) {
                newState.const.error = "<b>" + action.text.substring(0, e.location.start.offset) + "<mark class='text-danger'>" +
                action.text.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
                action.text.substring(e.location.end.offset, action.text.length) + "</b><br/>" +
                e.name + ": " + e.message;
            }
            return newState;

        case CHANGE_FUN:
            newState = {
                const: state.const,
                fun: {
                    input: action.text,
                    object: state.fun.object,
                    error: state.fun.error
                },
                pred: state.pred
            }
            try {
                let res = undefined;
                if (action.text !== "") {
                    res = parseFunctions(action.text); 
                    res = res.map(obj => [obj.name, obj.arity]);
                }
                newState.fun.object = new Map(res);
                newState.fun.error = "";
            } catch (e) {
                newState.fun.error = "<b>" + action.text.substring(0, e.location.start.offset) + "<mark class='text-danger'>" +
                action.text.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
                action.text.substring(e.location.end.offset, action.text.length) + "</b><br/>" +
                e.name + ": " + e.message;
            }
            return newState;

        case CHANGE_PRED:
            newState = {
                const: state.const,
                fun: state.fun,
                pred: {
                    input: action.text,
                    object: state.pred.object,
                    error: state.pred.error
                }
            }
            try {
                let res = undefined;
                if (action.text !== "") {
                    res = parsePredicates(action.text); 
                    res = res.map(obj => [obj.name, obj.arity]);
                }
                newState.pred.object = new Map(res);
                newState.pred.error = "";
            } catch (e) {
                newState.pred.error = "<b>" + action.text.substring(0, e.location.start.offset) + "<mark class='text-danger'>" +
                action.text.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
                action.text.substring(e.location.end.offset, action.text.length) + "</b><br/>" +
                e.name + ": " + e.message;
            }
            return newState;

        default:
            return state
    }
}

export default language;