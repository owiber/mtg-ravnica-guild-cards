'use strict';
const _ = require('lodash');
const SETS = require('./all-sets');
const GUILDS = {
  Azorius: true,
  Boros: true,
  Dimir: true,
  Golgari: true,
  Gruul: true,
  Izzet: true,
  Orzhov: true,
  Rakdos: true,
  Selesnya: true,
  Simic: true
};

let cards = {};

_.each(SETS, function (set) {
  _.each(set.cards, function(card) {
    let guild = card.watermark;
    if (GUILDS[guild]) {
      let guildCard = cards[card.name] = cards[card.name] || _.pick(card, 'name', 'watermark');
      guildCard.colors = (card.colors || ['-']).join('/');
      guildCard.sets = guildCard.sets || [];
      guildCard.sets.push(set.name);

      guildCard.rarity = guildCard.rarity || [];
      guildCard.rarity.push(card.rarity);
    }
  });
});

_.each(cards, function(card) {
  let sets = card.sets.join(',');
  let rarity = card.rarity.join(',');
  console.log(`${card.name}\t${card.watermark}\t${card.colors}\t${rarity}\t${sets}`);
});