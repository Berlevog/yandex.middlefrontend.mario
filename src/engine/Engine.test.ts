import { distanceTo, getAABBColision, isAABBColision, linearEquation, Rect } from "./Engine";

describe("AABB Collision detection works well", () => {
  it("Return false if no collision detected", () => {
    expect(isAABBColision(new Rect(0, 0, 100, 100), new Rect(101, 101, 100, 100))).toBeFalsy();
    expect(isAABBColision(new Rect(100, 100, 20, 20), new Rect(0, 0, 20, 20))).toBeFalsy();
    expect(isAABBColision(new Rect(0, 100, 100, 100), new Rect(0, 0, 100, 100))).toBeFalsy();
  });

  it("Return true when collision detected", () => {
    expect(isAABBColision(new Rect(0, 0, 100, 100), new Rect(50, 50, 100, 100))).toBeTruthy();
    expect(isAABBColision(new Rect(50, 50, 100, 100), new Rect(0, 0, 100, 100))).toBeTruthy();
    expect(isAABBColision(new Rect(0, 100, 100, 100), new Rect(0, 50, 100, 100))).toBeTruthy();
  });
});

describe("AABB Collision returns right colision side", () => {
  it("Should return right", () => {
    expect(getAABBColision(new Rect(0, 0, 100, 100), new Rect(80, 0, 100, 100))?.right).toBeTruthy();
  });
  it("Should return left", () => {
    expect(getAABBColision(new Rect(80, 0, 100, 100), new Rect(0, 0, 100, 100))?.left).toBeTruthy();
  });
  it("Should return top", () => {
    expect(getAABBColision(new Rect(0, 0, 100, 100), new Rect(0, 80, 100, 100))?.top).toBeTruthy();
  });
  it("Should return bottom", () => {
    expect(getAABBColision(new Rect(0, 80, 100, 100), new Rect(0, 0, 100, 100))?.bottom).toBeTruthy();
  });
});

it("Should return null if no collision", () => {
  expect(getAABBColision(new Rect(0, 0, 100, 100), new Rect(100, 100, 100, 100))).toBe(null);
});

it("Должен посчитать растояние между двумя точками", () => {
  expect(distanceTo({ x: 0, y: 0 }, { x: 0, y: 100 })).toBe(100);
  expect(Math.floor(distanceTo({ x: 25, y: 25 }, { x: 100, y: 100 }))).toBe(106);
});
it("Должен вычислить линейную функцию по двум точкам и вернуть Y от X", () => {
  expect(linearEquation({ x: 10, y: 10 }, { x: 20, y: 20 }, 15)).toBe(15);
  expect(linearEquation({ x: 0, y: 0 }, { x: 20, y: 20 }, 15)).toBe(15);
  expect(linearEquation({ x: 0, y: 0 }, { x: 10, y: 20 }, 10)).toBe(20);
  expect(linearEquation({ x: 0, y: 0 }, { x: 10, y: 20 }, 5)).toBe(10);
});
