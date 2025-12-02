import ItemRarity from "./ItemRarity";
import ItemType from "./ItemType";
import ItemCanBeFoundIn from "./ItemCanBeFoundIn";

export default interface Item {
    id: number;
    item_name: string;
    item_type_name: string;
    found_in_id: number;
    rarity_id: number;
    price: number;
    icon: string;
    description: string;
    can_be_deconstruct: boolean;
    item_type_id: number;
    item_type: ItemType;
    rarity: ItemRarity;
    found_in: ItemCanBeFoundIn;
}
