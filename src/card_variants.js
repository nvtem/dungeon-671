import {PotionCard, EnemyCard, WeaponCard, ShuffleCard, ChestCard, LightningCard, BombCard, SpikesCard, NothingCard} from './cards.js'

export function getCardVariants() {
    return [
        {
            cardClass: EnemyCard,
            subtype: 'bee'
        },
        {
            cardClass: EnemyCard,
            subtype: 'scorpion'
        },
        {
            cardClass: EnemyCard,
            subtype: 'hedgehog'
        },
        {
            cardClass: EnemyCard,
            subtype: 'spider'
        },
        {
            cardClass: EnemyCard,
            subtype: 'warrior-1'
        },
        {
            cardClass: EnemyCard,
            subtype: 'warrior-2'
        },
        {
            cardClass: EnemyCard,
            subtype: 'mutant'
        },
        {
            cardClass: EnemyCard,
            subtype: 'green-dragon'
        },
        {
            cardClass: EnemyCard,
            subtype: 'blue-dragon'
        },
        {
            cardClass: EnemyCard,
            subtype: 'red-dragon'
        },
        {
            cardClass: LightningCard
        },
        {
            cardClass: PotionCard,
            subtype: 'small'
        },
        {
            cardClass: PotionCard,
            subtype: 'big'
        },
        {
            cardClass: ChestCard,
        },
        {
            cardClass: ShuffleCard
        },
        {
            cardClass: WeaponCard,
            subtype: 'sword',
            subsubtype: 'normal'
        },
        {
            cardClass: WeaponCard,
            subtype: 'sword',
            subsubtype: 'poisoned'
        },
        {
            cardClass: WeaponCard,
            subtype: 'axe',
            subsubtype: 'normal'
        },
        {
            cardClass: WeaponCard,
            subtype: 'axe',
            subsubtype: 'poisoned'
        },
        {
            cardClass: WeaponCard,
            subtype: 'dagger',
            subsubtype: 'normal'
        },
        {
            cardClass: WeaponCard,
            subtype: 'dagger',
            subsubtype: 'poisoned'
        }
        ,
        {
            cardClass: BombCard,
            subtype: 'horizontal'
        }
        ,
        {
            cardClass: BombCard,
            subtype: 'vertical'
        },
        {
            cardClass: BombCard,
            subtype: 'super'
        },
        {
            cardClass: SpikesCard,
            subtype: 'single'
        },
        {
            cardClass: SpikesCard,
            subtype: 'double'
        },
        {
            cardClass: SpikesCard,
            subtype: 'double-180'
        },
        {
            cardClass: SpikesCard,
            subtype: 'triple'
        },
        {
            cardClass: NothingCard,
        },
    ]
}
