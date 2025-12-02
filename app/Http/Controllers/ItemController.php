<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Item;
use App\Repository\ItemReadRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    private ItemReadRepository $itemReadRepository;

    public function __construct(ItemReadRepository $itemReadRepository)
    {
        $this->itemReadRepository = $itemReadRepository;
    }

    public function list(Request $request): JsonResponse
    {
        $filters = $request->input();
        return response()->json($this->itemReadRepository->getPaginatedItems(filter: $filters));
    }
    public function getItemById(Request $request): JsonResponse
    {

    }

}
