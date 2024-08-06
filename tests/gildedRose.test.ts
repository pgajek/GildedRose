import { Item } from "../item";
import { GildedRose } from "../gildedRose";

describe("Gilded Rose", () => {
  it("should decrease sellIn and quality for normal items", () => {
    const items = [new Item("Normal Item", 10, 20)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it('should increase quality for "Aged Brie" by 2 when 10 days or less remain', () => {
    const items = [new Item("Aged Brie", 10, 20)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(22);
  });

  it('should increase quality for "Aged Brie" as it gets older', () => {
    const items = [new Item("Aged Brie", 10, 20)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(21);
  });

  it('should not change quality of "Sulfuras, Hand of Ragnaros"', () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });

  it('should increase quality of "Backstage passes" as sellIn decreases', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
    ];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(21);
  });

  it('should increase quality of "Backstage passes" by 2 when 10 days or less remain', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(22);
  });

  it('should increase quality of "Backstage passes" by 3 when 5 days or less remain', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(23);
  });

  it('should drop quality of "Backstage passes" to 0 after concert', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('should degrade "Conjured" items quality twice as fast', () => {
    const items = [new Item("Conjured", 10, 20)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(18);
  });

  it("should never let quality be negative", () => {
    const items = [new Item("Normal Item", 10, 0)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(0);
  });

  it("should never let quality exceed 50 for non-legendary items", () => {
    const items = [new Item("Aged Brie", 10, 50)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  it('should not decrease quality for "Sulfuras, Hand of Ragnaros"', () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });
});
