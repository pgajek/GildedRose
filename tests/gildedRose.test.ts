import { Item } from "../item";
import { GildedRose } from "../gildedRose";

describe("Gilded Rose", () => {
  describe("Normal Items", () => {
    it("should decrease sellIn and quality for normal items", () => {
      const items = [new Item("Normal Item", 10, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it("should degrade quality twice as fast after sell-by date", () => {
      const items = [new Item("Normal Item", 0, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it("should never let quality be negative", () => {
      const items = [new Item("Normal Item", 10, 0)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(0);
    });
  });

  describe('"Aged Brie"', () => {
    it("should increase quality as it gets older", () => {
      const items = [new Item("Aged Brie", 10, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(21);
    });

    it("should never let quality exceed 50", () => {
      const items = [new Item("Aged Brie", 10, 50)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);
    });
  });

  describe('"Sulfuras, Hand of Ragnaros"', () => {
    it("should not change quality or sellIn", () => {
      const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(80);
    });
  });

  describe('"Backstage passes"', () => {
    it("should increase quality by 1 when more than 10 days remain", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(21);
    });

    it("should increase quality by 2 when 10 days or less remain", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(22);
    });

    it("should increase quality by 3 when 5 days or less remain", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(23);
    });

    it("should drop quality to 0 after the concert", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });

  describe('"Conjured" Items', () => {
    it("should degrade quality twice as fast", () => {
      const items = [new Item("Conjured Mana Cake", 10, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(18);
    });

    it("should degrade quality twice as fast after sell-by date", () => {
      const items = [new Item("Conjured Mana Cake", 0, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(16);
    });

    it("should never let quality be negative", () => {
      const items = [new Item("Conjured Mana Cake", 10, 0)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(0);
    });
  });
});
