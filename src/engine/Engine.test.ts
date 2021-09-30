import { distanceTo, getAABBCollision, isAABBCollision, linearEquation } from "./Engine";
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
