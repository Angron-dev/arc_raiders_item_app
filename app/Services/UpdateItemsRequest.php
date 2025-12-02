<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class UpdateItemsRequest
{
    const string API_URL = 'https://metaforge.app/api/arc-raiders/items';
    public function updateItemsInDatabase(): void
    {
        $allItems = [];
        for ($i = 1; $i <= 6; $i++) {
            $response = Http::withoutVerifying()->get(self::API_URL, [
                'page' => $i,
                'limit' => 100,
            ]);

            if (!$response->successful()) {
                dd($response->status(), $response->body());
            }

            $items = $response->json();
            $allItems = array_merge($allItems, $items['data']);
        }

        foreach ($allItems as $item) {
            $foundInId = DB::table('item_can_be_found_in')->where('found_in_name', $item['loot_area'])->value('id');
            $rarityId = DB::table('item_rarity')->where('rarity_name', $item['rarity'])->value('id');
            $itemTypeId = DB::table('item_type')->where('item_type_name', $item['item_type'])->value('id');

            if (!$foundInId && $item['loot_area']) {
                $foundInId = DB::table('item_can_be_found_in')->insertGetId([
                    'found_in_name' => $item['loot_area'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            if (!$rarityId && $item['rarity']) {
                $rarityId = DB::table('item_rarity')->insertGetId([
                    'rarity_name' => $item['rarity'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            if (!$itemTypeId) {
                $itemTypeId = DB::table('item_type')->insertGetId([
                    'item_type_name' => $item['item_type'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::table('items')->updateOrInsert(
                [
                    'item_name' => $item['name'],
                    'found_in_id' => $foundInId,
                    'rarity_id' => $rarityId,
                    'price' => $item['value'],
                    'icon' => $item['icon'],
                    'description' => $item['description'],
                    'item_type_id' => $itemTypeId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
