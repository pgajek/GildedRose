import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  private increaseQuality(item: Item, value: number): void {
    item.quality = Math.min(item.quality + value, 50);
  }

  private decreaseQuality(item: Item, value: number): void {
    if (item.name.includes("Conjured")) {
      value *= 2;
    }

    item.quality = Math.max(item.quality - value, 0);
  }

  private updateAgedBrie(item: Item) {
    this.increaseQuality(item, 1);

    item.sellIn--;
  }

  private updateBackstagePass(item: Item) {
    const value = item.sellIn < 6 ? 3 : item.sellIn < 11 ? 2 : 1;

    this.increaseQuality(item, value);

    item.sellIn--;

    if (item.sellIn <= 0) {
      item.quality = 0;
    }
  }

  private updateNormalItem(item: Item) {
    this.decreaseQuality(item, 1);

    item.sellIn--;

    if (item.sellIn < 0) {
      this.decreaseQuality(item, 1);
    }
  }

  private updateItem(item: Item) {
    switch (item.name) {
      case "Aged Brie":
        this.updateAgedBrie(item);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstagePass(item);
        break;
      case "Sulfuras, Hand of Ragnaros":
        item.quality = 80; //probably not needed, I left it here just in case of some bugs.
        break;
      default:
        this.updateNormalItem(item);
        break;
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.updateItem(item);
    });

    return this.items;
  }
}
