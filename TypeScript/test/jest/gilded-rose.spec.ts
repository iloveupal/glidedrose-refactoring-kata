import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  // basic item tests
  it('should process non-specific items correctly', () => {
    const itemName = 'random-item-name';
    const gildedRose = new GildedRose([new Item(itemName, 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(itemName); // name should stay the same
    expect(items[0].quality).toBe(19); // should decrease
    expect(items[0].sellIn).toBe(9); // should decrease
  });

  it('should process non-specific items after sell-in-date correctly', () => {
    const itemName = 'random-item-name';
    const gildedRose = new GildedRose([new Item(itemName, 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(itemName); // name should stay the same
    expect(items[0].quality).toBe(18); // should decrease twice as fast
    expect(items[0].sellIn).toBe(-1); // should decrease
  });

  it('quality should never be negative', () => {
    const itemName = 'random-item-name';
    const gildedRose = new GildedRose([new Item(itemName, 7, 1)]);
    for (let i = 0; i < 10; i++) {
      gildedRose.updateQuality();
    }

    const items = gildedRose.items;

    expect(items[0].name).toBe(itemName); // name should stay the same
    expect(items[0].quality).toBe(0); // should not be below zero
    expect(items[0].sellIn).toBe(-3); // can and should go below zero
  });

  // brie
  it('should process aged brie correctly', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 0), new Item("Aged Brie", 0, 0), new Item("Aged Brie", 50, 49)]);

    for (let i = 0; i < 10; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0]).toEqual({
      name: 'Aged Brie',
      sellIn: 0,
      quality: 10,
    }); // quality grows rather than decrease

    expect(gildedRose.items[1]).toEqual({
      name: 'Aged Brie',
      sellIn: -10,
      quality: 20,
    }); // quality grows even though its sell in date has passed, and it grows twice as fast

    expect(gildedRose.items[2]).toEqual({
      name: 'Aged Brie',
      sellIn: 40,
      quality: 50,
    }); // but quality never outgrows 50
  })

  // concert tickets
  it('should process backstage passes correctly', () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 60, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)
    ]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0]).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 59,
      quality: 1,
    }); // quality grows rather than decrease

    expect(gildedRose.items[1]).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 9,
      quality: 2, 
    }); // quality starts growing twice as fast if the sell-in-date is in 10 days

    expect(gildedRose.items[2]).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 4,
      quality: 3,
    }); // quality grows at 3x rate if there are less than 5 days to sell

    expect(gildedRose.items[3]).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: -1,
      quality: 0,
    }); // quality becomes 0 once the deadline has passed
  })
  // sulfuras
  it('should process sulfuras correctly', () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]);

    
    for (let i = 0; i < 10; i++) {
      gildedRose.updateQuality();
    }

    // neither quality nor sell in date should change
    expect(gildedRose.items[0]).toEqual({
      name: 'Sulfuras, Hand of Ragnaros',
      sellIn: 0,
      quality: 80,
    });
    expect(gildedRose.items[1]).toEqual({
      name: 'Sulfuras, Hand of Ragnaros',
      sellIn: -1,
      quality: 80,
    });
  })

  // conjured
  it('should process conjured items correctly', () => {
    const itemName = 'Conjured';
    const gildedRose = new GildedRose([new Item(itemName, 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(itemName); // name should stay the same
    expect(items[0].quality).toBe(18); // should decrease at 2x rate
    expect(items[0].sellIn).toBe(9); // should decrease
  });
});
