import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  private increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  private decreaseQuality(item: Item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  private updateAgedBrie(item: Item) {
    this.increaseQuality(item);

    item.sellIn--;

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  private updateBackstagePass(item: Item) {
    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }

    item.sellIn--;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  private updateNormalItem(item: Item) {
    this.decreaseQuality(item);

    item.sellIn--;

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  private updateConjuredItem(item: Item) {
    this.decreaseQuality(item);
    this.decreaseQuality(item);

    item.sellIn--;

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
      this.decreaseQuality(item);
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
        // Sulfuras does not need updating
        break;
      case "Conjured":
        this.updateConjuredItem(item);
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
