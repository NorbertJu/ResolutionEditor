import { CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions';
import { parseConstants, parseFunctions, parsePredicates } from '@fmfi-uk-1-ain-412/js-fol-parser';


const language = (state = { consts: { input: "", object: new Set(), error: "" }, funs: { input: "", object: new Map(), error: "" }, preds: { input: "", object: new Map(), error: "" } }, action = { type: undefined }) => {
    switch (action.type) {
        case CHANGE_CONST:
            let consts = { ...state.consts, input: action.text, error: "" };
            try {
                if (action.text !== "") {
                    consts.object = new Set(parseConstants(action.text));
                } else {
                    consts.object = new Set();
                }

            } catch (e) {
                consts.error = e;
            }
            consts = validateSymbols(consts, "consts", state);
            return { ...state, consts };

        case CHANGE_FUN:
            let funs = { ...state.funs, input: action.text, error: "" };
            try {
                if (action.text !== "") {
                    funs.object = new Map(parseFunctions(action.text).map(obj => [obj.name, obj.arity]));


                } else {
                    funs.object = new Map();
                }
            } catch (e) {
                funs.error = e;
            }
            funs = validateSymbols(funs, "funs", state);
            return { ...state, funs };

        case CHANGE_PRED:
            let preds = { ...state.preds, input: action.text, error: "" };
            try {
                preds.object = new Map(parsePredicates(action.text).map(obj => [obj.name, obj.arity]));
            } catch (e) {
                preds.error = e;
            }
            preds = validateSymbols(preds, "preds", state);
            return { ...state, preds };

        default:
            return state
    }
}

function validateSymbols(symbols, type, state) {
    switch (type) {
        case "consts": {
            if (!validSymbols(symbols)) {
                return symbols;
            }
            if (validSymbols(state.funs)) {
                for (const symbol1 of symbols.object) {
                    for (const [symbol2, _] of state.funs.object) {
                        if (symbol1 === symbol2) {
                            return {
                                ...symbols,
                                error: {
                                    name: "DuplicityError",
                                    message: "Symbol \"" + symbol1 + "\" is already a function"
                                }
                            }
                        }
                    }
                }
            }
            if (validSymbols(state.preds)) {
                for (const symbol1 of symbols.object) {
                    for (const [symbol2, _] of state.preds.object) {
                        if (symbol1 === symbol2) {
                            return {
                                ...symbols,
                                error: {
                                    name: "DuplicityError",
                                    message: "Symbol \"" + symbol1 + "\" is already a predicate"
                                }
                            }
                        }
                    }
                }
            }
            return symbols;
        }

        case "funs": {
            if (!validSymbols(symbols)) {
                return symbols;
            }
            if (validSymbols(state.consts)) {
                for (const [symbol1, _] of symbols.object) {
                    for (const symbol2 of state.consts.object) {
                        if (symbol1 === symbol2) {
                            return {
                                ...symbols,
                                error: {
                                    name: "DuplicityError",
                                    message: "Symbol \"" + symbol1 + "\" is already a constant"
                                }
                            }
                        }
                    }
                }
            }
            if (validSymbols(state.preds)) {
                for (const [symbol1, _] of symbols.object) {
                    for (const [symbol2, _] of state.preds.object) {
                        if (symbol1 === symbol2) {
                            return {
                                ...symbols,
                                error: {
                                    name: "DuplicityError",
                                    message: "Symbol \"" + symbol1 + "\" is already a predicate"
                                }
                            }
                        }
                    }
                }
            }
            return symbols;
        }

        case "preds": {
            if (!validSymbols(symbols)) {
                return symbols;
            }
            if (validSymbols(state.consts)) {
                for (const [symbol1, _] of symbols.object) {
                    for (const symbol2 of state.consts.object) {
                        if (symbol1 === symbol2) {
                            return {
                                ...symbols,
                                error: {
                                    name: "DuplicityError",
                                    message: "Symbol \"" + symbol1 + "\" is already a constant"
                                }
                            }
                        }
                    }
                }
            }
            if (validSymbols(state.funs)) {
                for (const [symbol1, _] of symbols.object) {
                    for (const [symbol2, _] of state.funs.object) {
                        if (symbol1 === symbol2) {
                            return {
                                ...symbols,
                                error: {
                                    name: "DuplicityError",
                                    message: "Symbol \"" + symbol1 + "\" is already a function"
                                }
                            }
                        }
                    }
                }
            }
            return symbols;
        }

        default:
            return symbols;
    }

}

function validSymbols(symbols) {
    return symbols.error === "" && symbols.input !== ""
}

export default language;