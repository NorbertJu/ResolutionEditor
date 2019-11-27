import * as model from './index'

var v1 = new model.Variable("x"), v2 = new model.Variable("y"), v3 = new model.Variable("z");
var c1 = new model.Constant("A"), c2 = new model.Constant("B");
var f1 = new model.Function("f", [v1, c1]), f2 = new model.Function("g", [v1, f1]);
var l1 = new model.Literal(false, "p", [v2, c2, f2]), l2 = new model.Literal(true, "l", [v1, c2]), l3 = new model.Literal(true, "q", [v3, v1]);
var cl1 = new model.Clause([[l1,1], [l2,1], [l3,1]]), cl2 = new model.Clause([[l3,2]]);

// Termy

test('variable', () => {
    expect(new model.Variable("a").toString()).toBe("a");
});

test('constant', () => {
    expect(new model.Constant("A")).toStrictEqual(c1);
});

test('function term', () => {
    expect(new model.Function("f",[new model.Variable("a")]).equals(new model.Function("f",[new model.Variable("a")]))).toBe(true);
});

//Substitucia a Rovnost

test('variable substitute', () => {
    expect(new model.Variable("a").substitute([[new model.Variable("a"), new model.Variable("b")]])).toStrictEqual(new model.Variable("b"));
});

test('literal substitute', () => {
    expect(l1.substitute([[v1, v2]])).toStrictEqual(new model.Literal(false, "p", [v2, c2, new model.Function("g", [v2, new model.Function("f", [v2,c1])])]));
});

test('clause substitute', () => {
    expect(cl1.substitute([[v1, v2],[v3,c2]])).toStrictEqual(new model.Clause(new Map([[new model.Literal(false, "p", [v2, c2, new model.Function("g", [v2, new model.Function("f", [v2,c1])])]),1], [new model.Literal(true, "l", [v2, c2]),1], [new model.Literal(true, "q", [c2, v2]),1]])));
});

test('clause equals', () => {
    expect(cl1.equals(new model.Clause(new Map([[new model.Literal(false, "p", [new model.Variable("y"), new model.Constant("B"), new model.Function("g", [new model.Variable("x"), new model.Function("f", [new model.Variable("x"), new model.Constant("A")])])]),1], [new model.Literal(true, "l", [new model.Variable("x"), new model.Constant("B")]),1], [new model.Literal(true, "q", [new model.Variable("z"), new model.Variable("x")]),1]])))).toBe(true);
});

test('clause substitute 2', () => {
    expect(cl2.substitute([[v1, v2]])).toStrictEqual(new model.Clause(new Map([[new model.Literal(true, "q", [new model.Variable("z"), new model.Variable("y")]),2]])));
});

test('clause equals 2', () => {
    expect(cl2.equals(new model.Clause(new Map([[new model.Literal(true, "q", [new model.Variable("z"), new model.Variable("x")]),2]])))).toBe(true);
});