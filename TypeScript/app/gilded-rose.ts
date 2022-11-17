export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_TICKETS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured';

const normalizeQuality = (quality) => Math.min(Math.max(quality, 0), 50);

const updateAgedBrie = ({ name, sellIn, quality }: Item): Item => {
  const increment = sellIn <= 0 ? +2 : +1;

  return {
    name,
    sellIn: sellIn - 1,
    quality: normalizeQuality(quality + increment),
  }
}

const updateBackstageTickets = ({ name, sellIn, quality }: Item): Item => {
  const increment = 
    sellIn <= 0 ? -Infinity :
    sellIn <= 5 ? +3 :
    sellIn <= 10 ? +2 : +1;

  return {
    name,
    sellIn: sellIn - 1,
    quality: normalizeQuality(quality + increment),
  }
}

const updateSulfuras = ({ name, sellIn, quality }: Item): Item => {
  return {
    name,
    sellIn,
    quality,
  }
}

const updateConjured = ({ name, sellIn, quality }: Item): Item => {
  const increment = sellIn <= 0 ? -4 : -2;

  return {
    name,
    sellIn: sellIn - 1,
    quality: normalizeQuality(quality + increment),
  }
}

const updateBasicItem = ({ name, sellIn, quality }: Item): Item => {
  const increment = sellIn <= 0 ? -2 : -1;

  return {
    name,
    sellIn: sellIn - 1,
    quality: normalizeQuality(quality + increment),
  }
}

const updateItem = (item: Item): Item => {
  switch (item.name) {
    case AGED_BRIE:
      return updateAgedBrie(item);
    case BACKSTAGE_TICKETS:
      return updateBackstageTickets(item);
    case SULFURAS:
      return updateSulfuras(item);
    case CONJURED:
      return updateConjured(item);
    default:
      return updateBasicItem(item);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      return updateItem(item);
    })

    return this.items;
  }
}
