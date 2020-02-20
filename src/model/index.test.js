import * as model from './index'

const V = name => new model.Variable(name);
const C = name => new model.Constant(name);
const F = (name, args) => new model.Function(name, args);
const L = (neg, name, args) => new model.Literal(neg, name, args);
const Cl = (args) => new model.Clause(args);

const Vx = V("x");
const Vy = V("y");
const Vz = V("z");
const CA = C("A");
const CB = C("B");
const Ff = F("f", [Vx, CA]);
const Fg = F("g", [Vx, Ff]);
const Lp = L(false, "p", [Vy, CB, Fg]);
const Ll = L(true, "l", [Vx, CB]);
const Lq = L(true, "q", [Vz, Vx]);
const Lw = L(false, "q", [Vy, Vx])
const Cl1 = Cl([Lp, Ll, Lq]);
const Cl2 = Cl([Lq]);
const Cl3 = Cl([Lw]);


describe('toString()', () => {
test('Variable', () => {
    expect(Vx.toString()).toBe("x");
});
test('Constant', () => {
    expect(CB.toString()).toBe("B");
});
test('Function', () => {
    expect(Ff.toString()).toBe("f(x, A)");
});
test('Literal', () => {
    expect(Lp.toString()).toBe("p(y, B, g(x, f(x, A)))");
});
test('Clause', () => {
    expect(Cl1.toString()).toBe("p(y, B, g(x, f(x, A))) ∨ ¬l(x, B) ∨ ¬q(z, x)");
});
});


describe('equals()', () => {
test('Variable', () => {
    expect((Vx).equals(V("x"))).toBe(true);
});
test('Constant', () => {
    expect((CA).equals(C("A"))).toBe(true);
});
test('Function', () => {
    expect((Fg).equals(F("g", [V("x"), F("f", [V("x"), C("A")])]))).toBe(true);
});
test('Literal', () => {
    expect((Lp).equals(L(false, "p", [
        V("y"), 
        C("B"), 
        F("g", [V("x"), F("f", [V("x"), C("A")])])
    ]))).toBe(true);
});
test('Clause', () => {
    expect((Cl1).equals(Cl([Lq, Lp, Ll]))).toBe(true);
    expect((Cl1).equals(Cl2)).toBe(false);
    expect((Cl([Ll, Lq, Lq])).equals(Cl([Lq, Ll, Lq]))).toBe(true);
    expect((Cl([Ll])).equals(Cl([Ll, Ll]))).toBe(false);
});
});


describe('substitute()', () => {
test('Variable', () => {
    expect(Vx.substitute(new Map([["x", Vy]]))).toStrictEqual(Vy);
    expect(Vx.substitute(new Map([["x", CA]]))).toStrictEqual(CA);
    expect(Vx.substitute(new Map([["x", Ff]]))).toStrictEqual(Ff);
});
test('Constant', () => {
    expect(CA.substitute(new Map([["x", CB]]))).toStrictEqual(CA);
});
test('Function', () => {
    expect(Fg.substitute(new Map([["x", Vy]]))).toStrictEqual(F("g", [Vy, F("f", [Vy, CA])]));
    expect(Fg.substitute(new Map([["x", CA]]))).toStrictEqual(F("g", [CA, F("f", [CA, CA])]));
    expect(Fg.substitute(new Map([["x", Ff]]))).toStrictEqual(F("g", [Ff, F("f", [Ff, CA])]));
});
test('Literal', () => {
    expect(Lp.substitute(new Map([["x", Vy]]))).toStrictEqual(L(
        false,
        "p",
        [Vy, CB, F("g", [Vy, F("f", [Vy, CA])])]
    ));
    expect(Lp.substitute(new Map([["x", CA]]))).toStrictEqual(L(
        false,
        "p",
        [Vy, CB, F("g", [CA, F("f", [CA, CA])])]
    ));
    expect(Lp.substitute(new Map([["x", Ff]]))).toStrictEqual(L(
        false,
        "p",
        [Vy, CB, F("g", [Ff, F("f", [Ff, CA])])]
    ));
});
test('Clause', () => {
    expect(Cl1.substitute(new Map([["x", Vy]]))).toStrictEqual(Cl(
        [
            L(
                false,
                "p",
                [Vy, CB, F("g", [Vy, F("f", [Vy, CA])])]
            ),
            L(true, "l", [V("y"), CB]),
            L(true, "q", [Vz, V("y")])
        ]
    ));
    expect(Cl1.substitute(new Map([["x", CA]]))).toStrictEqual(Cl(
        [
            L(
                false,
                "p",
                [Vy, CB, F("g", [CA, F("f", [CA, CA])])]
            ),
            L(true, "l", [CA, CB]),
            L(true, "q", [Vz, CA])
        ]
    ));
    expect(Cl1.substitute(new Map([["x", Ff]]))).toStrictEqual(Cl(
        [
            L(
                false,
                "p",
                [Vy, CB, F("g", [Ff, F("f", [Ff, CA])])]
            ),
            L(true, "l", [Ff, CB]),
            L(true, "q", [Vz, Ff])
        ]
    ));
    expect(Cl1.substitute(new Map([["x", Vy], ["y", Vz], ["z", CB]]))).toStrictEqual(Cl(
        [
            L(
                false,
                "p",
                [Vz, CB, F("g", [Vy, F("f", [Vy, CA])])]
            ),
            L(true, "l", [V("y"), CB]),
            L(true, "q", [CB, V("y")])
        ]
    ));
    expect(Cl1.substitute(new Map([["B", Vy]]))).toStrictEqual(Cl([Lp, Ll, Lq]));
});
});

describe('isResolvent()', () => {
    test('Simple', () => {
        expect(Cl([]).isResolvent(Cl2, Cl3, new Map(),new Map([["y", Vz]]))).toBe(true);
    });

    test('Medium', () => {
        expect(Cl([Lp, Ll]).substitute(new Map([["y", Vz]])).isResolvent(Cl1, Cl3, new Map(), new Map([["y", Vz]]))).toBe(true);
    });

    test('Multiple', () => {
        expect(Cl([L(false,"l",[V("x")]), L(true,"l",[V("x")])]).isResolvent(
            Cl([L(false,"p",[V("y")]), L(false,"l",[V("x")])]),
            Cl([L(true,"p",[V("y")]), L(true,"l",[V("x")])]),
            new Map(),
            new Map()
        )).toBe(true);

        expect(Cl([L(false,"p",[V("y")]), L(true,"p",[V("y")])]).isResolvent(
            Cl([L(false,"p",[V("y")]), L(false,"l",[V("x")])]),
            Cl([L(true,"p",[V("y")]), L(true,"l",[V("x")])]),
            new Map(),
            new Map()
        )).toBe(true);
    });
});

describe('isFactor()', () => {
    test('Simple', () => {
        expect(Cl([Lp]).isFactor(Cl([Lp,Lp]), new Map())).toBe(true);
    });

    test('Medium', () => {
        expect(Cl([Lp, Ll]).substitute(new Map([["y", Vz]])).isFactor(Cl([Ll,Lp,Lp]), new Map([["y", Vz]]))).toBe(true);
    });

    test('Multiple', () => {
        expect(Cl([L(false,"l",[V("x")]), L(false,"l",[V("x")]), L(true,"p",[V("y")])]).isFactor(
            Cl([L(true,"p",[V("y")]), L(false,"l",[V("x")]), L(true,"p",[V("y")]), L(false,"l",[V("x")])]),
            new Map()
        )).toBe(true);

        expect(Cl([L(true,"p",[V("y")]), L(true,"p",[V("y")]), L(false,"l",[V("x")])]).isFactor(
            Cl([L(true,"p",[V("y")]), L(false,"l",[V("x")]), L(true,"p",[V("y")]), L(false,"l",[V("x")])]),
            new Map()
        )).toBe(true);
    });
});