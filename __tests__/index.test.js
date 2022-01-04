import nekonames from "../index";

const nekos = (x) => Object.values(nekonames(x));

describe("nekonames", () => {
  test("n=0", () => {
    expect(nekos([])).toEqual([]);
  });

  test("n=1", () => {
    expect(nekos(["Vernor Vinge"])).toEqual(["Vernor"]);
  });

  test("readme example", () => {
    expect(
      nekos([
        "George Michael",
        "George Orwell",
        "George Martin",
        "George Raymond Richard Martin",
      ])
    ).toEqual([
      "George Michael",
      "George O.",
      "George Martin",
      "George R. R. M.",
    ]);
  });

  test("n>1", () => {
    expect(
      nekos([
        "d v b",
        "George Martin",
        "George Orwell",
        "George Raymond Richard Martin",
        "George Roderick Robert Michael",
        "qntm",
        "Robert Anson Heinlein",
        "Robert Jordan",
        "Vernor Vinge",
      ])
    ).toEqual([
      "d v b",
      "George Martin",
      "George O.",
      "George R. R. Martin",
      "George Michael",
      "qntm",
      "Robert H.",
      "Robert J.",
      "Vernor",
    ]);
  });

  test("mononymous authors", () => {
    expect(nekos(["qntm", "qntm surname"])).toEqual(["qntm", "qntm s."]);
  });

  test("stylized initials", () => {
    expect(nekos(["d v b"])).toEqual(["d v b"]);
  });

  describe("unavoidable ambiguity", () => {
    test("gives up", () => {
      expect(nekos(["George Martin", "George Raymond Richard Martin"])).toEqual(
        ["George Martin", "George R. R. M."]
      );
    });

    test("still avoids further ambiguity", () => {
      expect(
        nekos([
          "George Martin",
          "George Raymond Richard Martin",
          "George Roderick Robert Michael",
        ])
      ).toEqual(["George Martin", "George R. R. Martin", "George Michael"]);
    });
  });
});
