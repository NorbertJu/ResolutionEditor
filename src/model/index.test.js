import * as model from './index'

const Vx = new model.Variable("x");
const Vy = new model.Variable("y");
const Vz = new model.Variable("z");
const CA = new model.Constant("A");
const CB = new model.Constant("B");
const Ff = new model.Function("f", [Vx, CA]);
const Fg = new model.Function("g", [Vx, Ff]);
const Lp = new model.Literal(false, "p", [Vy, CB, Fg]);
const Ll = new model.Literal(true, "l", [Vx, CB]);
const Lq = new model.Literal(true, "q", [Vz, Vx]);
const Cl1 = new model.Clause([Lp, Ll, Lq]);
const Cl2 = new model.Clause([Lq]);

const V = name => new model.Variable(name);
const C = (name) => new model.Constant(name);
const F = (name, args) => new model.Function(name, args);
const L = (neg, name, args) => new model.Literal(neg, name, args);
const Cl = (args) => new model.Clause(args);


test('Variable toString', () => {
    expect(Vx.toString()).toBe("x");
});
test('Constant toString', () => {
    expect(CB.toString()).toBe("B");
});
test('Function toString', () => {
    expect(Ff.toString()).toBe("f(x, A)");
});
test('Literal toString', () => {
    expect(Lp.toString()).toBe("p(y, B, g(x, f(x, A)))");
});
test('Clause toString', () => {
    expect(Cl1.toString()).toBe("p(y, B, g(x, f(x, A))) ∨ ¬l(x, B) ∨ ¬q(z, x)");
});


test('Variable equals', () => {
    expect((Vx).equals(V("x"))).toBe(true);
});
test('Constant equals', () => {
    expect((CA).equals(C("A"))).toBe(true);
});
test('Function equals', () => {
    expect((Fg).equals(F("g", [V("x"), F("f", [V("x"), C("A")])]))).toBe(true);
});
test('Literal equals', () => {
    expect((Lp).equals(L(false, "p", [
        V("y"), 
        C("B"), 
        F("g", [V("x"), F("f", [V("x"), C("A")])])
    ]))).toBe(true);
});
/*
test('Clause equals', () => {
    expect((Cl1).equals()).toBe(true);
});
*/

test('Variable substitute', () => {
    expect(Vx.substitute([[Vx, Vy]])).toStrictEqual(Vy);
    expect(Vx.substitute([[Vx, CA]])).toStrictEqual(CA);
    expect(Vx.substitute([[Vx, Ff]])).toStrictEqual(Ff);
});
test('Constant substitute', () => {
    expect(CA.substitute([[Vx, CB]])).toStrictEqual(CA);
});
test('Function substitute', () => {
    expect(Fg.substitute([[Vx, Vy]])).toStrictEqual(F("g", [Vy, F("f", [Vy, CA])]));
    expect(Fg.substitute([[Vx, CA]])).toStrictEqual(F("g", [CA, F("f", [CA, CA])]));
    expect(Fg.substitute([[Vx, Ff]])).toStrictEqual(F("g", [Ff, F("f", [Ff, CA])]));
});
test('Literal substitute', () => {
    expect(Lp.substitute([[Vx, Vy]])).toStrictEqual(L(
        false,
        "p",
        [Vy, CB, F("g", [Vy, F("f", [Vy, CA])])]
    ));
    expect(Lp.substitute([[Vx, CA]])).toStrictEqual(L(
        false,
        "p",
        [Vy, CB, F("g", [CA, F("f", [CA, CA])])]
    ));
    expect(Lp.substitute([[Vx, Ff]])).toStrictEqual(L(
        false,
        "p",
        [Vy, CB, F("g", [Ff, F("f", [Ff, CA])])]
    ));
});
/*
test('Clause substitute', () => {
    expect(CA.substitute().toStrictEqual();
});
*/


/*
test('variable substitute', () => {
    expect(new model.Variable("a").substitute([[new model.Variable("a"), new model.Variable("b")]])).toStrictEqual(new model.Variable("b"));
});

test('literal substitute', () => {
    expect(Ll.substitute([[Vx, Vy]])).toStrictEqual(new model.Literal(false, "p", [Vy, CB, new model.Function("g", [Vy, new model.Function("f", [Vy,CA])])]));
});

test('Clause substitute', () => {
    expect(Cl1.substitute([[Vx, Vy],[Vz,CB]])).toStrictEqual(new model.Clause(new Map([[new model.Literal(false, "p", [Vy, CB, new model.Function("g", [Vy, new model.Function("f", [Vy,CA])])]),1], [new model.Literal(true, "l", [Vy, CB]),1], [new model.Literal(true, "q", [CB, Vy]),1]])));
    expect(Cl2.substitute([[Vx, Vy]])).toStrictEqual(new model.Clause(new Map([[new model.Literal(true, "q", [new model.Variable("z"), new model.Variable("y")]),2]])));
});

test('clause equals', () => {
    expect(Cl1.equals(new model.Clause(new Map([[new model.Literal(false, "p", [new model.Variable("y"), new model.Constant("B"), new model.Function("g", [new model.Variable("x"), new model.Function("f", [new model.Variable("x"), new model.Constant("A")])])]),1], [new model.Literal(true, "l", [new model.Variable("x"), new model.Constant("B")]),1], [new model.Literal(true, "q", [new model.Variable("z"), new model.Variable("x")]),1]])))).toBe(true);
});

test('clause equals 2', () => {
    expect(Cl2.equals(new model.Clause(new Map([[new model.Literal(true, "q", [new model.Variable("z"), new model.Variable("x")]),2]])))).toBe(true);
});
*/