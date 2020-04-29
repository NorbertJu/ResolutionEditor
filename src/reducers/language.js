import { CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions';
import { parseConstants, parseFunctions, parsePredicates } from '@fmfi-uk-1-ain-412/js-fol-parser';


const language = (state = { consts: { input: "", object: new Set(), error: "", symbols: [] }, funs: { input: "", object: new Map(), error: "", symbols: [] }, preds: { input: "", object: new Map(), error: "", symbols: [] } }, action = { type: undefined }) => {
    switch (action.type) {
        case CHANGE_CONST:
            let consts = { ...state.consts, input: action.text, error: "" };
            try {
                if (action.text !== "") {
                    consts.symbols = parseConstants(action.text)
                    consts.object = new Set(consts.symbols);
                } else {
                    consts.symbols = [];
                    consts.object = new Set();
                }

            } catch (e) {
                consts.error = e;
            }
            return { ...state, 
                consts: validateConsts(consts),
                funs: validateFuns(state.funs, consts),
                preds: validatePreds(state.preds, state.funs, consts)
            };

        case CHANGE_FUN:
            let funs = { ...state.funs, input: action.text, error: "" };
            try {
                if (action.text !== "") {
                    funs.symbols = parseFunctions(action.text);
                    funs.object = new Map(funs.symbols.map(obj => [obj.name, obj.arity]));
                } else {
                    funs.symbols = [];
                    funs.object = new Map();
                }
            } catch (e) {
                funs.error = e;
            }
            return { ...state, 
                funs: validateFuns(funs, state.consts),
                preds: validatePreds(state.preds, funs, state.consts)
            };

        case CHANGE_PRED:
            let preds = { ...state.preds, input: action.text, error: "" };
            try {
                preds.symbols = parsePredicates(action.text);
                preds.object = new Map(preds.symbols.map(obj => [obj.name, obj.arity]));
            } catch (e) {
                preds.error = e;
            }
            return { ...state, 
                preds: validatePreds(preds, state.funs, state.consts)
            };

        default:
            return state
    }
}

function validSymbols(symbols) {
    return symbols.error === "" && symbols.input !== ""
}

function validateConsts(consts) {
    if (!validSymbols(consts) && consts.error.name !== "DuplicityError") {
        return consts;
    } else {
        for (let i = 0; i < consts.symbols.length; i++) {
            for (let j = i+1; j < consts.symbols.length; j++) {
                if (consts.symbols[i] === consts.symbols[j]) {
                    return {
                        ...consts,
                        error: {
                            name: "DuplicityError",
                            message: "Symbol \"" + consts.symbols[i] + "\" is already a constant"
                        }
                    }
                }
            }
        }
    }
    return {
        ...consts,
        error: ""
    }
}

function validateFuns(funs, consts) {
    if (!validSymbols(funs) && funs.error.name !== "DuplicityError") {
        return funs;
    } else {
        for (let i = 0; i < funs.symbols.length; i++) {
            for (let j = i+1; j < funs.symbols.length; j++) {
                if (funs.symbols[i].name === funs.symbols[j].name) {
                    return {
                        ...funs,
                        error: {
                            name: "DuplicityError",
                            message: "Symbol \"" + funs.symbols[i].name + "\" is already a function"
                        }
                    }
                }
            }
        }
        
    } 
    if (validSymbols(consts)) {
        for (const [symbol1, _] of funs.object) {
            for (const symbol2 of consts.object) {
                if (symbol1 === symbol2) {
                    return {
                        ...funs,
                        error: {
                            name: "DuplicityError",
                            message: "Symbol \"" + symbol1 + "\" is already a constant"
                        }
                    }
                }
            }
        }
    }
    return {
        ...funs,
        error: ""
    }
}

function validatePreds(preds, funs, consts) {
    if (!validSymbols(preds) && preds.error.name !== "DuplicityError") {
        return preds;
    } else {
        for (let i = 0; i < preds.symbols.length; i++) {
            for (let j = i+1; j < preds.symbols.length; j++) {
                if (preds.symbols[i].name === preds.symbols[j].name) {
                    return {
                        ...preds,
                        error: {
                            name: "DuplicityError",
                            message: "Symbol \"" + preds.symbols[i].name + "\" is already a predicate"
                        }
                    }
                }
            }
        }
    }
    if (validSymbols(funs)) {
        for (const [symbol1, _] of funs.object) {
            for (const [symbol2, _] of preds.object) {
                if (symbol1 === symbol2) {
                    return {
                        ...preds,
                        error: {
                            name: "DuplicityError",
                            message: "Symbol \"" + symbol1 + "\" is already a function"
                        }
                    }
                }
            }
        }

    } 
    if (validSymbols(consts)) {
        for (const symbol1 of consts.object) {
            for (const [symbol2, _] of preds.object) {
                if (symbol1 === symbol2) {
                    return {
                        ...preds,
                        error: {
                            name: "DuplicityError",
                            message: "Symbol \"" + symbol1 + "\" is already a constant"
                        }
                    }
                }
            }
        }
    }
    return {
        ...preds,
        error: ""
    }

}

export default language;