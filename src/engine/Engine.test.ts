import {
  distanceTo,
  getAABBCollision,
  getAngle,
  getCollision,
  getEdges,
  isAABBCollision,
  isPointInside,
  linearEquation,
} from "./Engine";
import { Point } from "./Point";
import { Rect } from "./Rect";

describe("AABB Collision detection works well", () => {
  it("Return false if no collision detected", () => {
    expect(
      isAABBCollision(
        new Rect({ x: 0, y: 0, width: 100, height: 100 }),
        new Rect({ x: 101, y: 101, width: 100, height: 100 })
      )
    ).toBeFalsy();
    expect(
      isAABBCollision(
        new Rect({ x: 100, y: 100, width: 20, height: 20 }),
        new Rect({ x: 0, y: 0, width: 20, height: 20 })
      )
    ).toBeFalsy();
    expect(
      isAABBCollision(
        new Rect({ x: 0, y: 100, width: 100, height: 100 }),
        new Rect({ x: 0, y: 0, width: 100, height: 100 })
      )
    ).toBeFalsy();
  });

  it("Return true when collision detected", () => {
    expect(
      isAABBCollision(
        new Rect({ x: 0, y: 0, width: 100, height: 100 }),
        new Rect({ x: 50, y: 50, width: 100, height: 100 })
      )
    ).toBeTruthy();
    expect(
      isAABBCollision(
        new Rect({ x: 50, y: 50, width: 100, height: 100 }),
        new Rect({ x: 0, y: 0, width: 100, height: 100 })
      )
    ).toBeTruthy();
    expect(
      isAABBCollision(
        new Rect({ x: 0, y: 100, width: 100, height: 100 }),
        new Rect({ x: 0, y: 50, width: 100, height: 100 })
      )
    ).toBeTruthy();
  });
});

describe("Должен возвращать сторону прямоугольника с которой произошла коллизия", () => {
  it("Should return right", () => {
    expect(
      getAABBCollision(
        new Rect({ x: 0, y: 0, width: 100, height: 100 }),
        new Rect({ x: 80, y: 0, width: 100, height: 100 })
      )?.right
    ).toBeTruthy();
  });
  it("Should return left", () => {
    expect(
      getAABBCollision(
        new Rect({ x: 80, y: 0, width: 100, height: 100 }),
        new Rect({ x: 0, y: 0, width: 100, height: 100 })
      )?.left
    ).toBeTruthy();
  });
  it("Should return top", () => {
    expect(
      getAABBCollision(
        new Rect({ x: 0, y: 0, width: 100, height: 100 }),
        new Rect({ x: 0, y: 80, width: 100, height: 100 })
      )?.top
    ).toBeTruthy();
  });
  it("Should return bottom", () => {
    expect(
      getAABBCollision(
        new Rect({ x: 0, y: 80, width: 100, height: 100 }),
        new Rect({ x: 0, y: 0, width: 100, height: 100 })
      )?.bottom
    ).toBeTruthy();
  });
});

it("Should return null if no collision detected", () => {
  expect(
    getAABBCollision(
      new Rect({ x: 0, y: 0, width: 100, height: 100 }),
      new Rect({ x: 100, y: 100, width: 100, height: 100 })
    )
  ).toBe(null);
});

it("Должен посчитать растояние между двумя точками", () => {
  expect(distanceTo(new Point({ x: 0, y: 0 }), new Point({ x: 0, y: 100 }))).toBe(100);
  expect(Math.floor(distanceTo(new Point({ x: 25, y: 25 }), new Point({ x: 100, y: 100 })))).toBe(106);
});
it("Должен вычислить линейную функцию по двум точкам и вернуть Y от X", () => {
  expect(linearEquation(new Point({ x: 10, y: 10 }), new Point({ x: 20, y: 20 }), 15)).toBe(15);
  expect(linearEquation(new Point({ x: 0, y: 0 }), new Point({ x: 20, y: 20 }), 15)).toBe(15);
  expect(linearEquation(new Point({ x: 0, y: 0 }), new Point({ x: 10, y: 20 }), 10)).toBe(20);
  expect(linearEquation(new Point({ x: 0, y: 0 }), new Point({ x: 10, y: 20 }), 5)).toBe(10);
});

it("Должен посчитать угол наклона прямой по двум точкам", () => {
  expect(getAngle(new Point({ x: 0, y: 0 }), new Point({ x: 2, y: 2 }))).toBe(45);
  expect(getAngle(new Point({ x: 10, y: 10 }), new Point({ x: 15, y: 10 }))).toBe(-0);
  expect(getAngle(new Point({ x: 0, y: 0 }), new Point({ x: 2, y: -2 }))).toBe(-45);
});

describe("Должен вернуть точки углов прямоугольника", () => {
  const edges = getEdges(new Rect({ x: 10, y: 10, width: 10, height: 10 }));
  it("topLeft", () => {
    expect(edges.topLeft).toEqual({ x: 10, y: 10 });
  });
  it("topMiddle", () => {
    expect(edges.topMiddle).toEqual({ x: 15, y: 10 });
  });

  it("topRight", () => {
    expect(edges.topRight).toEqual({ x: 20, y: 10 });
  });

  it("bottomLeft", () => {
    expect(edges.bottomLeft).toEqual({ x: 10, y: 20 });
  });

  it("bottomMiddle", () => {
    expect(edges.bottomMiddle).toEqual({ x: 15, y: 20 });
  });

  it("bottomRight", () => {
    expect(edges.bottomRight).toEqual({ x: 20, y: 20 });
  });

  it("rightMiddle", () => {
    expect(edges.rightMiddle).toEqual({ x: 20, y: 15 });
  });
  it("leftMiddle", () => {
    expect(edges.leftMiddle).toEqual({ x: 10, y: 15 });
  });
});

it("Должен вернуть true если точка внутри прямоугольника", () => {
  expect(isPointInside(new Point({ x: 10, y: 10 }), new Rect({ x: 0, y: 0, width: 20, height: 20 }))).toBeTruthy();
  expect(isPointInside(new Point({ x: 30, y: 30 }), new Rect({ x: 0, y: 0, width: 20, height: 20 }))).toBeFalsy();
});

describe("Должен вернуть углы прямоугольника которые соприкасаются с другим прямоугольником", () => {
  const rect = new Rect({ x: 20, y: 20, width: 20, height: 20 });
  const noCollision = {
    topLeft: false,
    topMiddle: false,
    topRight: false,
    leftMiddle: false,
    rightMiddle: false,
    bottomLeft: false,
    bottomMiddle: false,
    bottomRight: false,
  };
  it("нет касания ", function () {
    expect(getCollision(new Rect({ x: 0, y: 0, width: 10, height: 10 }), rect)).toEqual(noCollision);
  });
  it("topLeft", function () {
    const result = { ...noCollision, topLeft: true };
    expect(getCollision(new Rect({ x: 38, y: 38, width: 10, height: 10 }), rect)).toEqual(result);
  });
  it("topMiddle", function () {
    const result = { ...noCollision, topMiddle: true };
    expect(getCollision(new Rect({ x: 0, y: 30, width: 60, height: 60 }), rect)).toEqual(result);
  });
  it("topRight", function () {
    const result = { ...noCollision, topRight: true };
    expect(getCollision(new Rect({ x: -25, y: 25, width: 60, height: 60 }), rect)).toEqual(result);
  });
  it("leftMiddle", function () {
    const result = { ...noCollision, leftMiddle: true };
    expect(getCollision(new Rect({ x: 30, y: 0, width: 60, height: 60 }), rect)).toEqual(result);
  });
  it("bottomRight", function () {
    const result = { ...noCollision, bottomRight: true };
    expect(getCollision(new Rect({ x: -30, y: -30, width: 60, height: 60 }), rect)).toEqual(result);
  });
  it("bottomMiddle", function () {
    const result = { ...noCollision, bottomMiddle: true };
    expect(getCollision(new Rect({ x: 0, y: -30, width: 60, height: 60 }), rect)).toEqual(result);
  });
  it("bottomLeft", function () {
    const result = { ...noCollision, bottomLeft: true };
    expect(getCollision(new Rect({ x: 30, y: -30, width: 60, height: 60 }), rect)).toEqual(result);
  });
  it("leftSide", function () {
    const result = { ...noCollision, bottomLeft: true, topLeft: true, leftMiddle: true };
    expect(getCollision(new Rect({ x: 35, y: 25, width: 10, height: 10 }), rect)).toEqual(result);
  });
});
